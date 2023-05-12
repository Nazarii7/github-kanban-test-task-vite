import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIssuesListTask, IRootSate } from "../shared/interfaces/repoReducers";
import { DraggableLocation } from "react-beautiful-dnd";
import { retrieveDataRepo, retrieveIssuesRepo } from "./operations";

const initialState: IRootSate = {
  currentRepoTitle: "",
  arrRepoData: [],
};

const repoDataSlice = createSlice({
  name: "@@repo",
  initialState,
  reducers: {
    moveCard(
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
      }>
    ) {
      const currentBoard = state.arrRepoData.find(
        (item) => item.fullName === state.currentRepoTitle
      );
      if (currentBoard) {
        const sourceRow = Object.values(currentBoard).find(
          (item): item is IIssuesListTask =>
            (item as IIssuesListTask).title ===
            action.payload.source.droppableId
        );

        const destinationRow = Object.values(currentBoard).find(
          (item): item is IIssuesListTask =>
            (item as IIssuesListTask).title ===
            action.payload.destination.droppableId
        );

        if (sourceRow && destinationRow) {
          const selectedCard = sourceRow.taskList[action.payload.source.index];
          const arrWithoutCard = sourceRow.taskList.filter(
            (_, index) => index !== action.payload.source.index
          );
          sourceRow.taskList = arrWithoutCard;
          destinationRow.taskList.splice(
            action.payload.destination.index,
            0,
            selectedCard
          );
        }
      }
    },
    setCurrentTitle(state, action: PayloadAction<{ currentTitle: string }>) {
      state.currentRepoTitle = action.payload.currentTitle;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveDataRepo.fulfilled, (state, action) => {
      if (action.payload) {
        const rez = state.arrRepoData.findIndex(
          (item) => item.fullName === state.currentRepoTitle
        );
        if (rez === -1) {
          const newRepo = {
            fullName: state.currentRepoTitle,
            stargazersCount: action.payload.stargazersCount,
            todoState: { taskList: [], title: "ToDo" },
            progressState: { taskList: [], title: "In Progress" },
            doneState: { taskList: [], title: "Done" },
          };

          state.arrRepoData.push(newRepo);
        }
      }
    });
    builder.addCase(retrieveIssuesRepo.fulfilled, (state, action) => {
      if (action.payload) {
        const rez = state.arrRepoData.find(
          (item) => item.fullName === state.currentRepoTitle
        );
        if (rez) {
          rez.doneState.taskList = action.payload.doneState;
          rez.progressState.taskList = action.payload.progressState;
          rez.todoState.taskList = action.payload.todoState;
        }
      }
    });
  },
});

export const { moveCard, setCurrentTitle } = repoDataSlice.actions;

export default repoDataSlice.reducer;

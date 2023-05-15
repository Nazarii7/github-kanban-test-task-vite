import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IIssuesItem,
  IRepoData,
  IRootSate,
} from "../shared/interfaces/repoReducers";
import { Endpoints } from "../shared/enums/enumEndPoints";
import { convertKeys } from "../shared/helpers/convertKeys";
import { IResponseIssues } from "../shared/interfaces/responseIssues";

export const retrieveDataRepo = createAsyncThunk(
  "repo/retrieveDataRepo",
  async (_, { getState }) => {
    const state = getState() as IRootSate;

    try {
      const res = await fetch(`${Endpoints.API_URL}${state.currentRepoTitle}`);

      if (res.ok) {
        const data = await res.json();
        const formattedData = convertKeys(data) as Omit<
          IRepoData,
          "todoState" | "progressState" | "doneState"
        >;
        return formattedData;
      }
      throw new Error("Can't fetch");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const retrieveIssuesRepo = createAsyncThunk(
  "repo/retrieveIssuesRepo",
  async (_, { getState }) => {
    const state = getState() as IRootSate;

    try {
      const res = await fetch(
        `${Endpoints.API_URL}${state.currentRepoTitle}/issues`
      );

      if (res.ok) {
        const data = await res.json();

        const formattedData = convertKeys(data) as IResponseIssues[];
        const selectedData: IIssuesItem[] = formattedData.map((item) => {
          return {
            title: item.title,
            number: item.number,
            createdAt: item.createdAt,
            typeUser: item.user.type,
            comments: item.comments,
            state: item.state,
            assigne: item.assignee ? true : false,
          };
        });

        const doneState = selectedData.filter((item) => {
          return item.state === "close";
        });

        const progressState = selectedData.filter((item) => {
          return item.state === "open" && item.assignee;
        });
        const todoState = selectedData.filter((item) => {
          return item.state === "open" && !item.assignee.valueOf();
        });

        return { doneState, progressState, todoState };
      }
      throw new Error("Can't fetch");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

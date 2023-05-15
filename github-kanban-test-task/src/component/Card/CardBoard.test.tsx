import { describe, it, expect } from "vitest";
import { render, screen } from "../../utils/test-utils";
import CardBoard from "./CardBoard";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Store } from "@reduxjs/toolkit";
import { IRootSate } from "../../shared/interfaces/repoReducers";

const mockStore = configureStore<IRootSate>([]);

describe("CardBoard", () => {
  let store: Store<IRootSate>;

  beforeEach(() => {
    store = mockStore({
      arrRepoData: [],
      currentRepoTitle: "",
    });
  });

  it("render CardBoard with simple store", () => {
    store = mockStore({
      arrRepoData: [
        {
          fullName: "some/repo",
          stargazersCount: 0,
          todoState: { title: "To Do", taskList: [] },
          progressState: { title: "In Progress", taskList: [] },
          doneState: { title: "Done", taskList: [] },
        },
      ],
      currentRepoTitle: "some/repo",
    });
    render(
      <Provider store={store}>
        <CardBoard />
      </Provider>
    );
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});

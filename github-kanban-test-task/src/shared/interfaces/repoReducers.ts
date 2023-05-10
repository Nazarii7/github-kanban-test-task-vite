export interface IRepoData {
  fullName: string;
  stargazersCount: number;
  todoState: IIssuesListTask;
  progressState: IIssuesListTask;
  doneState: IIssuesListTask;
}

export interface IIssuesListTask {
  taskList: IIssuesItem[];
  title: string;
}

export interface IIssuesItem {
  title: string;
  number: number;
  createdAt: string;
  typeUser: string;
  comments: number;
  state: string;
  assigne: boolean;
}

export interface IRootSate {
  currentRepoTitle: string;
  arrRepoData: IRepoData[];
}
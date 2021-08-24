export interface IColumn {
  id: 'name' | 'owner' | 'description' | 'lang' | 'startCount';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface Data {
  name: string;
  owner: string;
  description: string;
  lang: string;
  startCount: number;
}

export interface IRepositoryData {
  description: string;
  name: string;
  stargazers: {
    totalCount: number;
  };
  isPrivate: boolean;
  owner: {
    login: string;
  };
}

export interface IRepositoriesData {
  nodes: [IRepositoryData];
}

export interface IInputValue {
  qualifier: string;
  value: string;
}

export interface IQueryVariables {
  variables: {
    searchBy: String;
    first: number;
    after?: null | String;
    before?: null | String;
  };
}

export interface IPaginationData {
  direction: string;
  rowsPerPage: number;
}

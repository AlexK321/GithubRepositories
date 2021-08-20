import { Data, IRepositoriesData } from './interfaces';

export default function createData(repData: IRepositoriesData): Data[] {
  const newData = repData?.nodes.map((item) => {
    return {
      name: item?.name,
      owner: item?.owner?.login,
      description: item?.description || '',
      lang: item?.owner?.login,
      startCount: item?.stargazers.totalCount,
    };
  });

  return newData;
}

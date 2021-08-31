import { GetAllRepositoriesQuery } from '../../generated/graphql';
import { Data, IRepositoriesData } from './interfaces';

export default function createData(repData: GetAllRepositoriesQuery): Data[] {
  const asd = repData.search.nodes

  const newData =
    repData?.search?.nodes?.map((item) => ({
      name: item?.name,
      owner: item?.owner?.login,
      description: item?.description || '',
      lang: item?.owner?.login,
      startCount: item?.stargazers.totalCount,
    })) || [];

  return newData;
}

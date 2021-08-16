import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import GET_REPOSITORY from '../../graphql/query/repository';

interface IParams {
  id: string;
}

const Repository: React.FC = () => {
  const params = useParams<IParams>();
  const repositoryId = params.id;

  const { data } = useQuery(GET_REPOSITORY, {
    variables: { name: repositoryId },
  });

  return (
    <div>
      <p>ID: {data?.user.repository.id}</p>
      <p>NAME: {data?.user.repository.name}</p>
      URL: <a href={data?.user.repository.url}>{data?.user.repository.url}</a>
      <p>ISSUE: {data?.user.issueComments.nodes[0].bodyText}</p>
      <p>Игорь -крутой чел, лучший из лучших \n</p>
    </div>
  );
};

export default Repository;

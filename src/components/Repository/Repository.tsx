import { useQuery } from '@apollo/client';
import React from 'react';
import GET_REPOSITORY from '../../graphql/query/repository';

const Repository: React.FC = () => {
  const url = new URL(window.location.href);

  const repositoryName = url.searchParams.get('name');
  const repositoryOwner = url.searchParams.get('owner');

  const { data } = useQuery(GET_REPOSITORY, {
    variables: { name: repositoryName, owner: repositoryOwner },
  });

  return (
    <div style={{ paddingTop: '100px' }}>
      <p>ID: {data?.repository.id}</p>
      <p>NAME: {data?.repository.name}</p>
      URL: <a href={data?.repository.url}>{data?.repository.url}</a>
      <p>description: {data?.repository.description}</p>
      <p>stargazerCount: {data?.repository.stargazerCount}</p>
      <p>isPrivate: {String(data?.repository.isPrivate)}</p>
    </div>
  );
};

export default Repository;

import { useQuery } from '@apollo/client';
import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GET_REPOSITORY from '../../graphql/query/repository';

const Repository: React.FC = () => {
  const { t, i18n } = useTranslation();
  const url = new URL(window.location.href);

  const repositoryName = url.searchParams.get('name');
  const repositoryOwner = url.searchParams.get('owner');

  const { data } = useQuery(GET_REPOSITORY, {
    variables: { name: repositoryName, owner: repositoryOwner },
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        value="Ru"
      >
        <MenuItem value="en">En</MenuItem>
        <MenuItem value="ru">Ru</MenuItem>
      </Select>
      <p>ID: {data?.repository.id}</p>
      <p>
        {t('repository.name')}: {data?.repository.name}
      </p>
      URL: <a href={data?.repository.url}>{data?.repository.url}</a>
      <p>
        {t('repository.description')}: {data?.repository.description}
      </p>
      <p>stargazerCount: {data?.repository.stargazerCount}</p>
      <p>
        {t('repository.isPrivate')}: {String(data?.repository.isPrivate)}
      </p>
    </div>
  );
};

export default Repository;

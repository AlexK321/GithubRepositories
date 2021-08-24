import { gql } from '@apollo/client';

const GET_REPOSITORY = gql`
  query MyQuery($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      isPrivate
      name
      url
      stargazerCount
      primaryLanguage {
        name
      }
      description
    }
  }
`;

export default GET_REPOSITORY;

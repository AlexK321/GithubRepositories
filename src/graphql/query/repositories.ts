import { gql } from '@apollo/client';

const GET_ALL_REPOSITORIES = gql`
  query MyQuery {
    user(login: "alexK321") {
      repositories(first: 36) {
        totalCount
        totalDiskUsage
        nodes {
          description
          name
          owner {
            login
          }
          stargazerCount
          languages(first: 3) {
            nodes {
              name
            }
          }
          isPrivate
        }
      }
    }
  }
`;

export default GET_ALL_REPOSITORIES;

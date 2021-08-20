import { gql } from '@apollo/client';

// const GET_ALL_REPOSITORIES = gql`
//   query MyQuery {
//     user(login: "alexK321") {
//       repositories(first: 36) {
//         totalCount
//         totalDiskUsage
//         nodes {
//           description
//           name
//           owner {
//             login
//           }
//           stargazerCount
//           languages(first: 3) {
//             nodes {
//               name
//             }
//           }
//           isPrivate
//         }
//       }
//     }
//   }
// `;

// export default GET_ALL_REPOSITORIES;

const GET_ALL_REPOSITORIES = gql`
  query MyQuery($searchBy: String!, $first: Int!, $after: String, $before: String) {
    search(query: $searchBy, type: REPOSITORY, first: $first, after: $after, before: $before) {
      nodes {
        ... on Repository {
          name
          id
          description
          owner {
            login
          }
          stargazers {
            totalCount
          }
        }
      }
      repositoryCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export default GET_ALL_REPOSITORIES;

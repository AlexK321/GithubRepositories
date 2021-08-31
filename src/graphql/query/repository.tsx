import { gql } from '@apollo/client';

const GET_REPOSITORY = gql`
  query getRepository($name: String!, $owner: String!) {
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

// overwrite: true
// schema: "src/graphql/schema.docs.graphql"
// documents: "src/graphql/query/*.*"
// generates:
//   src/generated/graphql.tsx:
//     plugins:
//       - "typescript"
//       - "typescript-operations"
//       - "typescript-react-apollo"

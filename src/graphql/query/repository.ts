import { gql } from '@apollo/client';

const GET_REPOSITORY = gql`
  query MyQuery($name: String!) {
    user(login: "AlexK321") {
      repository(name: $name) {
        id
        name
        owner {
          avatarUrl(size: 1000)
          id
          login
        }
        viewerSubscription
        url
        primaryLanguage {
          name
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
          }
        }
      }
      issueComments(first: 10) {
        nodes {
          bodyHTML
          bodyText
        }
      }
    }
  }
`;

export default GET_REPOSITORY;

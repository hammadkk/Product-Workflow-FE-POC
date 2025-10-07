import { gql } from '@apollo/client';

export const GET_ALL_NOTIFICATIONS = gql`
  query GetAllNotifications {
    notifications {
      id
      userId
      workflowId
      nodeId
      description
      productName
      isModified
    }
  }
`;

import { gql } from "@apollo/client";

export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification(
    $createNotificationInput: CreateNotificationInput!
  ) {
    createNotification(createNotificationInput: $createNotificationInput) {
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

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification(
    $updateNotificationInput: UpdateNotificationInput!
    $approval: Boolean = false
  ) {
    updateNotification(
      updateNotificationInput: $updateNotificationInput
      approval: $approval
    ) {
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

export const DELETE_NOTIFICATION = gql`
  mutation RemoveNotification($id: Int!) {
    removeNotification(id: $id) {
      id
      userId
      productName
    }
  }
`;

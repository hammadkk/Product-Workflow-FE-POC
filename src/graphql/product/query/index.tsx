import { gql } from "@apollo/client";


export const GET_All_Products = gql`
 query GetAllProducts {
  products {
    id
    name
    sku
    description
    mfr
    price
    status
  }
}
`;
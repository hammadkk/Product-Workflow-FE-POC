import { gql } from "@apollo/client";


export const Create_Product = gql`
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(createProductInput: $input) {
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
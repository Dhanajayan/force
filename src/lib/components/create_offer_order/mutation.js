module.exports = `
  mutation createOfferOrder(
    $artworkId: String!
    $editionSetId: String
    $quantity: Int
  ) {
    ecommerceCreateOfferOrderWithArtwork(
      input: {
        artworkId: $artworkId
        editionSetId: $editionSetId
        quantity: $quantity
      }
    ) {
      orderOrError {
        ... on OrderWithMutationSuccess {
          order {
            id
          }
        }
        ... on OrderWithMutationFailure {
          error {
            type
            code
            data
          }
        }
      }
    }
  }
`

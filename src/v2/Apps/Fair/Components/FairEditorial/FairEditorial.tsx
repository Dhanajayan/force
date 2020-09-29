import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairEditorial_fair } from "v2/__generated__/FairEditorial_fair.graphql"
import { FairEditorialItemFragmentContainer as FairEditorialItem } from "./FairEditorialItem"

interface FairEditorialProps {
  fair: FairEditorial_fair
}

export const FairEditorial: React.FC<FairEditorialProps> = ({ fair }) => {
  return (
    <>
      {fair.articles.edges.map(({ node: article }) => {
        return (
          <FairEditorialItem
            key={article.id}
            article={article}
            fairID={fair.internalID}
            fairSlug={fair.slug}
          />
        )
      })}
    </>
  )
}

export const FairEditorialFragmentContainer = createFragmentContainer(
  FairEditorial,
  {
    fair: graphql`
      fragment FairEditorial_fair on Fair {
        internalID
        slug
        articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
          edges {
            node {
              id
              ...FairEditorialItem_article
            }
          }
        }
      }
    `,
  }
)

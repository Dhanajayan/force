import React from "react"
import styled from "styled-components"
import { Box, BoxProps, HTML, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
// import { FeatureHeaderFull_feature } from "v2/__generated__/FeatureHeaderFull_feature.graphql"
// import { NAV_BAR_HEIGHT } from "v2/Components/NavBar"
const NAV_BAR_HEIGHT = 60

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export interface FeatureHeaderFullProps extends BoxProps {
  feature: any
}

export const FeatureHeaderFull: React.FC<FeatureHeaderFullProps> = ({
  feature,
  ...rest
}) => {
  if (!feature) {
    return null
  }
  const { name, subheadline, fullImage: image } = feature
  return (
    <Box {...rest}>
      {image && (
        <Box height={`calc(95vh - ${NAV_BAR_HEIGHT}px)`} bg="black10">
          <Image
            src={image._1x.url}
            srcSet={`${image._1x.url} 1x, ${image._2x.url} 2x`}
            alt={name}
          />
        </Box>
      )}

      <Box p={4}>
        <Join separator={<Spacer my={1} />}>
          <Text
            variant="largeTitle"
            as="h1"
            fontSize="size10"
            textAlign="center"
          >
            {name}
          </Text>

          {subheadline && (
            <HTML variant="subtitle" textAlign="center" html={subheadline} />
          )}
        </Join>
      </Box>
    </Box>
  )
}

export default createFragmentContainer(FeatureHeaderFull, {
  feature: graphql`
    fragment FeatureHeaderFull_feature on Feature {
      name
      subheadline(format: HTML)
      fullImage: image {
        _1x: cropped(width: 2000, height: 1000, version: ["main", "wide"]) {
          url
        }
        _2x: cropped(width: 4000, height: 2000, version: ["main", "wide"]) {
          url
        }
      }
    }
  `,
})

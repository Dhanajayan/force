import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import ArtistSeriesApp from "../ArtistSeriesApp"
import { graphql } from "react-relay"
import { ArtistSeriesApp_QueryRawResponse } from "v2/__generated__/ArtistSeriesApp_Query.graphql"
import { ArtistSeriesApp_UnfoundTest_QueryRawResponse } from "v2/__generated__/ArtistSeriesApp_UnfoundTest_Query.graphql"
import { Breakpoint } from "@artsy/palette"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "pumpkins",
      },
    },
  }),
  useIsRouteActive: () => false,
}))

describe("ArtistSeriesApp", () => {
  let slug = "pumpkins"

  describe("with a user who has the Artist Series lab feature", () => {
    let user = { lab_features: ["Artist Series"] }

    describe("with a published artist series", () => {
      const getWrapper = async (
        breakpoint: Breakpoint = "lg",
        response: ArtistSeriesApp_QueryRawResponse = ArtistSeriesAppFixture
      ) => {
        return renderRelayTree({
          Component: ({ artistSeries }) => {
            return (
              <MockBoot breakpoint={breakpoint} user={user}>
                <ArtistSeriesApp artistSeries={artistSeries} />
              </MockBoot>
            )
          },
          query: graphql`
            query ArtistSeriesApp_Query($slug: ID!) @raw_response_type {
              artistSeries(id: $slug) {
                ...ArtistSeriesApp_artistSeries
              }
            }
          `,
          variables: {
            slug,
          },
          mockData: response,
        })
      }

      it("renders the correct components", async () => {
        const wrapper = await getWrapper()
        expect(wrapper.find("AppContainer").length).toBe(1)
        expect(wrapper.find("ArtistSeriesHeader").length).toBe(1)
      })

      describe("ArtistSeriesHeader", () => {
        describe("desktop", () => {
          describe("with an artist", () => {
            it("renders correctly", async () => {
              const wrapper = await getWrapper()
              // TODO: expect(wrapper.find("ResponsiveImage").length).toBe(1)
              expect(wrapper.find("ArtistSeriesHeaderLarge").length).toBe(1)
              expect(wrapper.find("ArtistSeriesHeaderSmall").length).toBe(0)
              expect(wrapper.find("ArtistInfo").length).toBe(1)
              expect(wrapper.find("FollowArtistButton").length).toBe(1)
              const html = wrapper.html()
              expect(html).toContain("Pumpkins")
              expect(html).toContain("All of the pumpkins")
              expect(html).toContain("Yayoi Kusama")
              expect(html).toContain("https://test.artsy.net/yayoi-kusama.jpg")
            })
          })

          describe("without an artist", () => {
            it("renders the header without artist info", async () => {
              const wrapper = await getWrapper(
                "lg",
                ArtistSeriesWithoutArtistAppFixture
              )
              expect(wrapper.find("ArtistSeriesHeaderLarge").length).toBe(1)
              expect(wrapper.find("ArtistInfo").length).toBe(0)
            })
          })
        })

        describe("mobile", () => {
          describe("with an artist", () => {
            it("renders correctly", async () => {
              const wrapper = await getWrapper("xs")
              // TODO: expect(wrapper.find("ResponsiveImage").length).toBe(1)
              expect(wrapper.find("ArtistSeriesHeaderLarge").length).toBe(0)
              expect(wrapper.find("ArtistSeriesHeaderSmall").length).toBe(1)
              expect(wrapper.find("ArtistInfo").length).toBe(1)
              expect(wrapper.find("FollowArtistButton").length).toBe(1)
              const html = wrapper.html()
              expect(html).toContain("Pumpkins")
              expect(html).toContain("All of the pumpkins")
              expect(html).toContain("Yayoi Kusama")
              expect(html).toContain("https://test.artsy.net/yayoi-kusama.jpg")
            })
          })

          describe("without an artist", () => {
            it("renders the header without artist info", async () => {
              const wrapper = await getWrapper(
                "xs",
                ArtistSeriesWithoutArtistAppFixture
              )
              expect(wrapper.find("ArtistSeriesHeaderSmall").length).toBe(1)
              expect(wrapper.find("ArtistInfo").length).toBe(0)
            })
          })
        })
      })
    })
  })

  describe("with an unpublished or unfound artist series", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ArtistSeriesApp_UnfoundTest_QueryRawResponse = UnfoundArtistSeriesAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ artistSeries }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <ArtistSeriesApp artistSeries={artistSeries} />
            </MockBoot>
          )
        },
        query: graphql`
          query ArtistSeriesApp_UnfoundTest_Query($slug: ID!)
            @raw_response_type {
            artistSeries(id: $slug) {
              ...ArtistSeriesApp_artistSeries
            }
          }
        `,
        variables: {
          slug: "nonexistent slug",
        },
        mockData: response,
      })
    }

    it("returns 404 page", async () => {
      const wrapper = await getWrapper()
      const html = wrapper.html()
      expect(html).toContain(
        "Sorry, the page you were looking for doesn’t exist at this URL."
      )
    })
  })
})

const ArtistSeriesAppFixture: ArtistSeriesApp_QueryRawResponse = {
  artistSeries: {
    title: "Pumpkins",
    description: "All of the pumpkins",
    artists: [
      {
        name: "Yayoi Kusama",
        image: {
          url: "https://test.artsy.net/yayoi-kusama.jpg",
        },
        slug: "yayoi-kusama",
        internalID: "abc123",
        id: "abc123",
        is_followed: false,
        counts: {
          follows: 222,
        },
      },
    ],
  },
}

const ArtistSeriesWithoutArtistAppFixture: ArtistSeriesApp_QueryRawResponse = {
  artistSeries: {
    title: "Pumpkins",
    description: "All of the pumpkins",
    artists: [],
  },
}

const UnfoundArtistSeriesAppFixture: ArtistSeriesApp_UnfoundTest_QueryRawResponse = {
  artistSeries: null,
}

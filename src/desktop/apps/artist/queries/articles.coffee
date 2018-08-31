module.exports =
  """
  query ArtistArticlesQuery($artist_id: String!) {
    artist(id: $artist_id) {
      articles (limit: 99, in_editorial_feed: true, sort: PUBLISHED_AT_DESC) {
        href
        thumbnail_title
        thumbnail_teaser
        ...relatedArticleAuthorImage
      }
    }
  }

  #{require './article_fragment.coffee'}
  """

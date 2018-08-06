export const canvasBody = `
  id
  layout
  slug
  thumbnail_title
  thumbnail_image
  published_at
  contributing_authors {
    name
  }
  authors {
    name
  }
`

export const relatedArticles = `
  relatedArticlesPanel {
    id
    layout
    slug
    thumbnail_title
    thumbnail_image
  }
  relatedArticlesCanvas {
    ${canvasBody}
  }
  relatedArticles {
    description
    layout
    thumbnail_title
    thumbnail_image
    title
    slug
    published_at
    media {
      duration
      published
      release_date
    }
  }
`

export const relatedArticlesNews = (offset, limit) => {
  return `
    articles(published: true, in_editorial_feed: true, limit: 4, offset: ${offset}, sort: "-published_at"){
      ${canvasBody}
    }
  `
}

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master`

const token = (variables) =>
  `Bearer ${
    variables.preview
      ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
      : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  }`

const httpLink = createHttpLink({
  uri: endpoint,
  credentials: 'same-origin',
})

export const fetchCmsQuery = async (query, variables) => {
  try {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token(variables),
        },
      }
    })

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    })

    const res = await client.query({ query })
    return res.data
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    )
    console.error(error)
  }
}

export const getImageUrl = (
  url: string,
  avifSupport: boolean,
  width?: number,
  height?: number,
  quality: number = 100
) => {
  const params = [`fm=${avifSupport ? 'avif' : 'webp'}`]

  if (quality) params.push(`q=${Math.floor(quality)}`)
  if (width) params.push(`w=${Math.floor(width)}`)
  if (height) params.push(`h=${Math.floor(height)}`)

  return `${url}?${params.join('&')}`
}

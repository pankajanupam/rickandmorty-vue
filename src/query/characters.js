import gql from 'graphql-tag'

export const characters = gql` query ( $page: Int, $filter: FilterCharacter ) {
  characters(page: $page, filter: $filter ) {
    info {
        count,
        pages,
        next,
        prev
    }
    results { 
      id
      name
      image
      status
      species
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
}`

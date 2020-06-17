import gql from 'graphql-tag'

export const characters = gql` query ( $filter: FilterCharacter, $page: Int ) {
    characters(page: $page, filter: $filter ) {
      info {
          count,
          pages,
          next,
          prev
      }
      results { 
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

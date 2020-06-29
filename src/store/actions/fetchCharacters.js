import { apolloClient } from '../../main'
import { characters } from '../../query/characters'

export default async function ({ commit }, $filter, $page) {
  const response = await apolloClient.query({
    query: characters,
    loadingKey: 'loading',
    variables () {
      const filters = {}
      Object.keys(this.filter).map((key) => this.filter[key] && this.filter[key].length && (filters[key] = this.filter[key][0]))
      return {
        filter: filters,
        page: this.page
      }
    },
    update (data) {
      console.log(data, 'in update')
      try {
        this.characters.results && data.characters.info.pages !== 1 && data.characters.info.next !== 2 &&
          (data.characters.results = [...this.characters.results, ...data.characters.results])
        return data.characters
      } catch (error) {
        return {
          results: [],
          info: {}
        }
      }
    },
    skip () { // used to skip query
      return this.skipQuery
    }
  })

  commit('setBook', response.data.book)
}

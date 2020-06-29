import { characters } from '../components/charactersList/Query.js'
import { apolloClient } from '../main.js'

export default {
  async fetchCharacters ({ commit }, $filter, $page) {
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
  },
  async preFetch ({ commit }) {
    let preFetchresults = []
    let page
    do {
      const response = await apolloClient.query({
        query: characters,
        variables: {
          page: page
        }
      })
      const { data: { characters: { info, results } } } = response
      console.log('update called', info, results)
      page = info.next // && info.next < 3 &&
      results && (preFetchresults = [...preFetchresults, ...results])
    } while (page < 3)

    commit('enableFullMode', preFetchresults)
  }
}

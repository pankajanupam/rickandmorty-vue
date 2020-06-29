import { apolloClient } from '../../main'
import { characters } from '../../query/characters'

export default async function ({ commit }) {
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

export default {
  switchSearchMode (state, locationFilter) {
    state.characterPageFilters.status.type = 'checkbox'
    state.characterPageFilters.gender.type = 'checkbox'
    state.characterPageFilters.location = {
      type: 'checkbox',
      data: locationFilter
    }
    state.showAlert = false
  },
  setCharacters (state, characters) {
    state.characters = characters
  },
  enableFullMode (state, characters) {
    const location = {}
    characters.map((character) => (location[character.location.name] = true))

    this.commit('setCharacters', characters)
    this.commit('switchSearchMode', Object.keys(location))
  }
}

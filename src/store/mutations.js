export default {
  switchSearchMode (state, locationFilter) {
    state.characterPageFilters.status.type = 'checkbox'
    state.characterPageFilters.gender.type = 'checkbox'
    state.characterPageFilters.location = {
      type: 'checkbox',
      data: locationFilter
    }
    state.showAlert = false
  }
}

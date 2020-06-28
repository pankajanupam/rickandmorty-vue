export default {
  characters: [],
  showAlert: true,
  characterPageFilters: {
    status: {
      type: 'radio',
      data: ['Alive', 'Dead', 'unknown'] // we have only 3 possiable value as refered in api doc
    },
    gender: {
      type: 'radio',
      data: ['Female', 'Male', 'Genderless', 'unknown'] // we have only four possiable value as refered in api doc
    }
  }
}

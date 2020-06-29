<template>
  <div class="characters-list grid-x grid-margin-x grid-margin-y">
    <div v-for="(character, key) in charactersList" :key="key" class="cell small-6 large-3">
      <character-card :character="character"></character-card>
    </div>
    <!-- {{ fnPreFetch() }} -->
    <div class="cell small-12">
      <template v-if="loading">
        Loading...
      </template>
      <template v-else-if="characters.info && characters.info.next">
        <a href="#" @click.prevent="page=characters.info.next">Load More</a>
        <!-- <pagination></pagination> -->
      </template>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import CharacterCard from '@/components/base/CharacterCard.vue'
import { mapActions, mapState } from 'vuex'
// import Pagination from '@/components/Pagination.vue'
// import { characters } from './Query.js'

export default {
  props: {
    filter: {
      type: Object,
      default: () => ({})
    },
    enablePreFetch: Boolean
  },
  data: () => ({
    page: 1,
    loading: 0,
    preFetchPage: 1,
    charactersList: []
  }),
  created () {
    this.fnPreFetch()
  },
  computed: mapState(['characters', 'skipQuery']),
  components: {
    CharacterCard
    // Pagination
  },
  watch: {
    characters: function (newVal) {
      this.charactersList = newVal
    },
    filter: function (newVal, oldVal) {
      const activeFilters = { ...newVal }
      this.page = 1
      if (this.skipQuery) {
        const characters = []
        this.characters.every((character) => {
          Object.keys(activeFilters).every((filterKey) =>
            (typeof activeFilters[filterKey] === 'string' && character[filterKey].toLowerCase().indexOf(activeFilters[filterKey].toLowerCase()) > -1) ||
            (activeFilters[filterKey].length === 0 || activeFilters[filterKey].indexOf(character[filterKey].name || character[filterKey]) > -1)
          ) && characters.push(character)

          return characters.length < 20
        })
        this.charactersList = characters
      }
    }
  },
  methods: {
    ...mapActions({ fnPreFetch: 'preFetch' })
  }
}
</script>

<template>
  <div class="characters-list grid-x grid-margin-x grid-margin-y">
    <div v-for="(character, key) in characters.results" :key="key" class="cell small-6 large-3">
      <character-card :character="character"></character-card>
    </div>
    <div class="cell small-12">
      <template v-if="loading">
        Loading...
      </template>
      <template v-else-if="characters.info && characters.info.next">
        <a href="#" @click.prevent="page=characters.info.next">Load More</a>
        <pagination></pagination>
      </template>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import { characters } from './Query.js'

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
    characters: {},
    preFetch: {},
    preFetchPage: 1,
    skipQuery: false
  }),
  components: {
    CharacterCard,
    Pagination
  },
  watch: {
    filter: function (newVal, oldVal) {
      this.page = 1
      const characters = []
      this.preFetch.results.every((character) => {
        Object.keys(newVal).every((filterKey) => {
          return (typeof newVal[filterKey] === 'string' && character[filterKey].toLowerCase().indexOf(newVal[filterKey].toLowerCase()) > -1) ||
                  (newVal[filterKey].length === 0 || newVal[filterKey].indexOf(character[filterKey]) > -1)
        }) && characters.push(character)

        return characters.length < 20
      })
      this.characters.results = characters
      console.log(characters)
    },
    skipQuery: function (newVal, oldVal) {
      console.log(newVal, oldVal)
      newVal && this.$emit('preFetchRead')
    }
  },
  methods: {},
  apollo: {
    characters: {
      query: characters,
      loadingKey: 'loading',
      variables () {
        return {
          filter: { ...this.filter },
          page: this.page
        }
      },
      update (data) {
        this.characters.results &&
        data.characters.info.pages !== 1 &&
        data.characters.info.next !== 2 &&
          (data.characters.results = [...this.characters.results, ...data.characters.results])
        return data.characters
      },
      skip () { // used to skip query
        return this.skipQuery
      }
    },
    preFetch: {
      query: characters,
      variables () {
        return {
          page: this.preFetchPage
        }
      },
      update (data) {
        data.characters.info.next < 3 ? (this.preFetchPage = data.characters.info.next) : (this.skipQuery = true)
        this.preFetch.results &&
        data.characters.info.pages !== 1 &&
        data.characters.info.next !== 2 &&
          (data.characters.results = [...this.preFetch.results, ...data.characters.results])
        return data.characters
      },
      skip () { // used to skip query
        return this.skipQuery
      }
    }
  }
}
</script>

<style lang="scss">

</style>

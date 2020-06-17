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

import gql from 'graphql-tag'

// @ is an alias to /src
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  props: {
    filter: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return { characters: {}, page: 1, loading: 0, skipQuery: false }
  },
  components: {
    CharacterCard,
    Pagination
  },
  watch: {
    filter: function (newVal, oldVal) {
      this.page = 1
    }
  },
  methods: {
    /**
     * Callback for the onscroll event checks whether the scroll position
     * is near the bottom of the scroll container.
     */
    handleScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) this.loadBatch()
    }
  },
  apollo: {
    characters: {
      query: gql` query ( $filter: FilterCharacter, $page: Int ) {
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
      }`,
      loadingKey: 'loading',
      variables () {
        return {
          filter: { ...this.filter },
          page: this.page
        }
      },
      update (data) {
        // data.characters.info.next ? (this.page = data.characters.info.next) : (this.skipQuery = true)
        this.characters.results &&
        data.characters.info.pages !== 1 &&
        data.characters.info.next !== 2 &&
          (data.characters.results = [...this.characters.results, ...data.characters.results])
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

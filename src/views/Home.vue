<template>
  <div class="home">
    <h1>Vuejs Traning assigment</h1>
    <div class="grid-container fluid">
      <div class="grid-x grid-margin-x">
        <div class="cell small-12 medium-3">
          <filter-panel :filters="pageFilters" :selectedFilters="filter" :callbackfn="getSelectedFilter"></filter-panel>
        </div>
        <div class="cell small-12 medium-9">
          <div class="grid-x">
            <div class="cell small-12 top-panel-container">
              <top-panel :appliedfilters="filter" :callbackfn="getSearchTerm"></top-panel>
            </div>
            <div class="cell small-12">
              <characters-list :filter="filter"></characters-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import gql from 'graphql-tag'

// @ is an alias to /src
import FilterPanel from '@/components/FilterPanel.vue'
import TopPanel from '@/components/TopPanel.vue'
import CharactersList from '@/components/CharactersList.vue'

export default {
  name: 'Home',
  data () {
    return {
      filter: {},
      pageFilters: {
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
  },
  components: {
    FilterPanel,
    TopPanel,
    CharactersList
  },
  methods: {
    getSearchTerm (data) {
      this.filter = { ...this.filter, ...{ name: data } }
      // delete this.pageFilters.gender
      // this.pageFilters = { ...this.pageFilters }
    },
    getSelectedFilter (data) {
      this.filter = { ...this.filter, ...data } // data
    }
  }
  // apollo: {
  //   locations: {
  //     query: gql`
  //       query {
  //         locations{
  //           info {
  //             count
  //           }
  //           results {
  //             id
  //             name
  //           }
  //         }
  //       }
  //     `,
  //     update (data) {
  //       // this will create location filter if skip is false
  //       this.filters = { ...this.filters, ...{ location: data.locations.results.map(({ name }) => name) } }
  //     },
  //     skip () {
  //       // this query not in use as api does not support location based filter in characters
  //       return true
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: left;
    margin: 20px auto 30px 20px;
    text-transform: uppercase;
  }
  .top-panel-container {
    margin-top: 10px;
    min-height: 100px;
  }
</style>

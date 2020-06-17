<template>
  <div class="home">
    <div class="grid-container fluid">
      <vue-header :showCallout="showAlert"></vue-header>
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
              <characters-list :filter="filter" @preFetchRead="switchSearchMode" :enablePreFetch="false"></characters-list>
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
import VueHeader from '@/components/Header.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import TopPanel from '@/components/TopPanel.vue'
import CharactersList from '@/components/charactersList/CharactersList.vue'

export default {
  name: 'Home',
  data () {
    return {
      filter: {},
      showAlert: true,
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
    CharactersList,
    VueHeader
  },
  methods: {
    getSearchTerm (data) {
      this.filter = { ...this.filter, ...{ name: data } }
    },
    getSelectedFilter (data) {
      this.filter = { ...this.filter, ...data } // data
    },
    switchSearchMode (locationFilter) {
      this.pageFilters.status.type = 'checkbox'
      this.pageFilters.gender.type = 'checkbox'
      this.pageFilters.location = {
        type: 'checkbox',
        data: locationFilter
      }
      this.showAlert = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .top-panel-container {
    margin-top: 10px;
    min-height: 100px;
  }
</style>

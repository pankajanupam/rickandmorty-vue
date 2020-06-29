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
import { mapState, mapMutations } from 'vuex'

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
      filter: {}
    }
  },
  computed: mapState({ pageFilters: 'characterPageFilters', showAlert: 'showAlert' }),
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
    ...mapMutations(['switchSearchMode'])
  }
}
</script>

<style lang="scss" scoped>
  .top-panel-container {
    margin-top: 10px;
    min-height: 100px;
  }
</style>

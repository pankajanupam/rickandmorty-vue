<template>
  <div>
    <tags :data="tags" @tagRemoved="refreshData"></tags>
    <search-bar :callbackfn="searchChangeHandler"></search-bar>
  </div>
</template>

<script>

import Tags from './Tags.vue'
import SearchBar from './SearchBar.vue'

export default {
  props: {
    callbackfn: {
      type: Function,
      required: true
    },
    appliedfilters: Object
  },
  components: {
    SearchBar,
    Tags
  },
  watch: {
    // filter applied filter and remove unwanted key from tag
    appliedfilters: function (nv, ov) {
      const appliedfilters = JSON.parse(JSON.stringify(this.appliedfilters))
      delete appliedfilters.name
      this.tags = appliedfilters
    }
  },
  data () {
    return {
      tags: {},
      searchTerm: ''
    }
  },
  methods: {
    searchChangeHandler (searchTerm) {
      this.searchTerm = searchTerm
      this.callbackfn(searchTerm)
    },
    refreshData (data) {
      delete this.appliedfilters[data.key]
      this.callbackfn(this.searchTerm) // taking advantage of object refrence
    }
  }
}
</script>

<style lang="scss">
</style>

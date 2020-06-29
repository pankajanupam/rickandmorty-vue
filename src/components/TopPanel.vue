<template>
  <div>
    <tags :data="tags" @tagRemoved="refreshData"></tags>
    <div class="grid-x grid-margin-x">
      <div class="cell small-12 large-8">
        <search-bar :callbackfn="searchChangeHandler"></search-bar>
      </div>
      <div class="cell small-12 large-4">
        <dropdown></dropdown>
      </div>
    </div>
  </div>
</template>

<script>

import Tags from './base/Tags.vue'
import SearchBar from './base/SearchBar.vue'
import Dropdown from './base/Dropdown.vue'

export default {
  props: {
    callbackfn: {
      type: Function,
      required: true
    },
    appliedfilters: Object
  },
  components: {
    Tags,
    Dropdown,
    SearchBar
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
      tags: { gender: ['Male'] },
      searchTerm: ''
    }
  },
  methods: {
    searchChangeHandler (searchTerm) {
      this.searchTerm = searchTerm
      this.callbackfn(searchTerm)
    },
    refreshData (data) {
      this.appliedfilters[data.key].splice(this.appliedfilters[data.key].indexOf(data.value), 1)
      this.callbackfn(this.searchTerm) // taking advantage of object refrence
    }
  }
}
</script>

<style lang="scss">
</style>

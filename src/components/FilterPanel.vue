<template>
  <div class="filter-panel">
    <check-box-group
      v-for="(filter, key) in filters"
      :checkboxes="filter.data"
      :filterTitle="key"
      :callbackfn="changeHandler"
      :type="filter.type"
      :key="key"
      :checked="selectedFilters[key]"
    ></check-box-group>
  </div>
</template>

<script>
import CheckBoxGroup from './CheckBoxRadioGroup.vue'
// @ is an alias to /src

export default {
  props: {
    selectedFilters: Object,
    callbackfn: {
      type: Function,
      required: true
    },
    // keep filter data as page level to inscrese reusability
    filters: {
      type: Object,
      required: true
    }
  },
  components: {
    CheckBoxGroup
  },
  methods: {
    changeHandler (event) {
      this.selectedFilters[event.target.name] = event.target.value
      this.callbackfn(this.selectedFilters)
    }
  }
}
</script>

<style lang="scss">
  .filter-panel {
    width: 100%;
  }
</style>

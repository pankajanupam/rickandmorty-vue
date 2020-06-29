<template>
  <div class="filterpanel">
    <check-box-group
      v-for="(filter, key) in filters"
      :checkboxes="filter.data"
      :filterTitle="key"
      :callbackfn="checkboxChangeHandler"
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
    selectedFilters: {
      type: Object,
      default: () => ({})
    },
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
    checkboxChangeHandler (event) {
      const { target: { name, value, type, checked } } = event
      this.selectedFilters[name] || (this.selectedFilters[name] = [])
      type === 'radio'
        ? this.selectedFilters[name] = [value]
        : checked
          ? this.selectedFilters[name].push(value)
          : this.selectedFilters[name].splice(this.selectedFilters[name].indexOf(value), 1)

      this.callbackfn(this.selectedFilters)
    }
  }
}
</script>

<style lang="scss">
  .filterpanel {
    width: 100%;
  }
</style>

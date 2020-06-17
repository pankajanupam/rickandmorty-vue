<template>
  <fieldset class="fieldset">
    <legend>{{filterTitle}}</legend>
    <div v-for="(checkbox, key ) in checkboxes" :key="key">
        <input
          :id="checkbox"
          @change="callbackfn"
          :name="filterTitle"
          :type="type"
          v-model="selectedValues"
          :value="checkbox" />
        <label :for="checkbox">{{checkbox}}</label>
    </div>
  </fieldset>
</template>

<script>
// @ is an alias to /src
export default {
  props: {
    type: {
      type: String,
      default: 'checkbox'
    },
    filterTitle: {
      type: String,
      required: true
    },
    checkboxes: {
      type: Array,
      required: true
    },
    checked: [String, Array],
    callbackfn: {
      type: Function,
      required: true
    }
  },
  data: () => ({ selectedValues: [] }),
  watch: {
    checked: function (newVal, oldVal) {
      // console.log('checked watcher', newVal, oldVal)
      this.selectedValues = this.checked // convert props to local/state variable to use in model
    }
  }
}
</script>

<style lang="scss" scoped>
  .fieldset {
    margin-top: 0;
    box-shadow: inset 0px 0px 10px 0px rgba(180, 180, 180, 0.2);
    text-align: left;

    legend {
      text-transform: capitalize;
    }
  }
</style>

<template>
  <div class="grid-x grid-margin-x">
    <div class="cell small-24">
      <h1>Vuejs training assignment</h1>
      <callout v-if="showCallout"></callout>
    </div>
  </div>
</template>

<script>
import Callout from '@/components/base/Callout.vue'

export default {
  name: 'Header',
  props: {
    showCallout: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Callout
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: left;
    margin: 20px auto 10px 20px;
    text-transform: uppercase;
  }
</style>

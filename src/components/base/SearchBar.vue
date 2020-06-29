<template>
    <div>
        <input type="search" @input="changeHandler" placeholder="Type 3 or more char of name" />
    </div>
</template>

<script>

export default {
  props: {
    callbackfn: {
      type: Function,
      required: true
    }
  },
  methods: {
    changeHandler (event) {
      if (event.target.value.length > 2) {
        this.callbackfn(event.target.value)
      } else {
        this.callbackfn('')
      }
    }
  }
}
</script>

<style lang="scss">
</style>

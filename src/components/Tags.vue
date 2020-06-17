<template>
    <div class="tag-wrapper">
        <span class="label secondary" v-for="(tag, key) in tags"
        :key="tag+key">
          {{tag}} <a :data-key="key" :data-value="tag" @click.prevent="removeTag">x</a>
        </span>
    </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return { tags: {} }
  },
  methods: {
    removeTag (event) {
      delete this.tags[event.target.dataset.key]
      this.tags = { ...this.tags }
      this.$emit('tagRemoved', event.target.dataset, this.type)
    }
  },
  watch: {
    data: function () {
      this.tags = { ...this.data }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-wrapper {
    text-align: left;
    .label {
      font-weight: bold;
      margin: 10px 10px 10px 0;
      padding: 10px 10px 10px 15px;
      font-size: 1em;
      text-transform: capitalize;
      border-radius: 3px;
      a{
        font-size:80%;
        padding: 4px;
        cursor: pointer;
        color: #fff;
        &:hover {
          color: #f00;
        }
      }
    }
  }
</style>

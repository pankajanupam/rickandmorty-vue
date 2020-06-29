<template>
    <div class="tags">
      <template v-for="(tagArray, key) in tags">
        <span class="label secondary" v-for="tag in tagArray" :key="tag+key">
          {{tag}} <a :data-key="key" :data-value="tag" @click.prevent="removeTag">x</a>
        </span>
      </template>
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
  created () {
    this.tags = this.data
  },
  methods: {
    removeTag (event) {
      const data = event.target.dataset
      this.tags[data.key].splice(this.tags[data.key].indexOf(data.value), 1)
      this.$emit('tagRemoved', data)
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
  .tags {
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

<template>
  <div class="card">
    <img :src="character.image" alt="" />
    <div class="card-divider">
      <h4>{{character.name}}</h4>
    </div>
    <div class="card-section">
      <ul>
        <li v-for="(value, key) in fieldlist" :key="value">
          <strong>{{value}}</strong>
          <span>{{ character[key].name || character[key] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fieldlist: { status: 'status', species: 'species', gender: 'gender', origin: 'origin', location: 'last location' }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  box-shadow: inset 0px 0px 10px 0px rgba(8, 8, 8, 0.2);
  &-divider {
    margin-top: -67px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
  &-section {
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      li {
        display: flex;
        margin-top: 0.5rem;
        align-items: flex-end;
        letter-spacing: 0.05rem;
        justify-content: space-between;
        border-bottom: 1px solid;
        strong {
          font-size: 0.8rem;
          text-align: left;
          text-transform: uppercase;
        }
        span {
          text-align: right;
        }
      }
    }
  }
}
</style>

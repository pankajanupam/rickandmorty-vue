import Vue from 'vue'
// import VueResource from 'vue-resource'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Vue.use(VueResource)
Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

Vue.use(VueApollo)

export const eventBus = new Vue()

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router,
  store,
  render: h => h(App),
  apolloProvider
}).$mount('#app')

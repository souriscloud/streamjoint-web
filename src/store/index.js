import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './auth.store'

Vue.use(Vuex)

const modules = {
  auth: AuthModule
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules
})

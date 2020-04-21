import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
Vue.use(Vuex)
import searchedpost from './modules/searchedpost.js'
export default new Vuex.Store({
  state: {},

  getters:{},
  mutations: {},
  actions: {},
  modules: {
    searchedpost,
    posts
  }
})

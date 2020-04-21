import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
Vue.use(Vuex)
// import myPost from './modules/mypost.js'
export default new Vuex.Store({
  state: {},

  getters:{},
  mutations: {},
  actions: {},
  modules: {
    // myPost,
    posts
  }
})

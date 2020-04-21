import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
Vue.use(Vuex)
import myPost from './modules/mypost.js'
export default new Vuex.Store({
  state: {},

  getters:{},
  mutations: {},
  actions: {},
  modules: {
<<<<<<< HEAD
    myPost
=======
    posts
>>>>>>> 18871f4dcd0c77b722f411744d548db102460929
  }
})

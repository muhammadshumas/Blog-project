import Vue from 'vue'
import VueRouter from 'vue-router'
import search from '../views/search-page.vue'
import addPost from '../views/add-post.vue'
import allPosts from '../views/allPosts.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'search',
    component: search
  },
  {
    path: '/createPost',
    name: 'createPost',
    component:addPost
  },
  {
    path: '/allPosts',
    name: 'allposts',
    component:allPosts
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

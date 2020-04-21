import Vue from 'vue'
import VueRouter from 'vue-router'
import search from '../views/search-page.vue'
import addPost from '../views/add-post.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:addPost
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

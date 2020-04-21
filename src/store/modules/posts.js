import axios from 'axios'

const state={
  posts:[]
}

const getters={
  getPosts(state){
    return state.posts
  }
}
const mutations={
  fetchPosts(state,payload){
    axios.get('/getposts').then(posts=>{
      state.posts=posts.data
    }).catch(err=>{
      console.log(err)
    }) 
  }
}
const actions={
  fetchPosts(context,posts){
    context.commit('fetchPosts',posts)
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}
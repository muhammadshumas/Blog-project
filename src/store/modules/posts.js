const state={
  posts:[]
}

const getters={
  getPosts(state){
    return state.posts
  }
}

const mutations={
  fetchPosts(state,posts){
    state.posts=posts
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


const state={
        searchTitle: '',
        searchTag: '',

        // posts: [],

        searchedPosts: []
    }

   const getters= {
    getsearchedPosts(state) {
        return state.searchedPosts;
    }
   }

  const mutations = {

    search(state, payload) {
        state.searchedPosts= []
        
        if (payload.title) {

            this.state.posts.posts.forEach((post) => {
                if (post.title == payload.title) {
                    state.searchedPosts.push(post)
                    console.log(post)
                }
            })

        } 
        else if (payload.tag) {
            this.state.posts.posts.forEach((post) => {
                let tagsarray=post.tags.split(',');
                tagsarray.forEach((tag) => {
                    if (tag == payload.tag) {
                        state.searchedPosts.push(post);
                    }
                })
            })
        }
        
    },

    deletePost(state, payload) {
        state.posts.splice(payload.index, 1);
        state.searchedPosts.splice(payload.index, 1);
        console.log('All Posts', state.posts)
        console.log('Searched Posts', state.searchedPosts)
    }

    }

   const actions = {
       
    search: ({commit}, payload) => {

        commit('search', payload);
    },
    deletePost: ({commit}, payload) => {

         commit('deletePost', payload);
        },
    }
   
export default{
    state,
    getters,
    mutations,
    actions
}
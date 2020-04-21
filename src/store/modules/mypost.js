

const state={
        searchTitle: '',
        searchTag: '',

        posts: [{
                title: 'post1',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis inventore debitis culpa, iste',
                tag: ['tag1', 'tag2', 'tag3', 'tag4'],
            },
            {
                title: 'post2',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis inventore debitis culpa, iste',
                tag: ['tag1', 'tag6', 'tag7', 'tag8'],
            },
            {
                title: 'post3',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis inventore debitis culpa, iste',
                tag: ['tag5', 'tag6', 'tag8', 'tag9'],
            },
            {
                title: 'post4',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis inventore debitis culpa, iste',
                tag: ['tag10', 'tag12', 'tag3', 'tag15'],
            }

        ],

        searchedPosts: []
    }

   const getters= {
    getsearchedPosts(state) {
        return state.searchedPosts;
    }
   }

  const mutations = {

    search(state, payload) {
        if (payload.title) {

            state.posts.forEach((post) => {
                if (post.title == payload.title) {
                    state.searchedPosts.push(post)
                }
            })

        } else if (payload.tag) {
            state.posts.forEach((post) => {
                post.tag.forEach((tag) => {
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
    search: ({
        commit
    }, payload) => {

        commit('search', payload);
    },
    deletePost: ({
        commit
    }, payload) => {

         commit('deletePost', payload);
        }
    }
   
export default{
    state,
    getters,
    mutations,
    actions
}
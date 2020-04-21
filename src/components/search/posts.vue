<template>
    
         <div class="blog" >
                   <div v-for="(post,index) in getSearchedPosts" :key="index">
                        <h1>{{post.title}}</h1>
                        <p>{{post.content}}</p>

                        <div class="tags my-3" v-for="(tag,i) in post.tag" :key="i">
                            <span>{{tag}}</span>
                        </div>

                        <div class="actions my-5">
                            <b-button pill variant="primary" @click="copyPost(post.content)">Copy to clipboard</b-button>
                            <b-button pill variant="outline-secondary">Edit</b-button>
                            <b-button pill variant="success" @click="deletePost(index)">Delete</b-button>
                        </div>
                   </div>

         </div>

   
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        post:[],
         computed: {
            ...mapGetters(["getSearchedPosts"])
        },
        methods:{
            deletePost(index){
                this.$store.dispatch('deletePost',{index:index});
            },

            copyPost(content) {
                this.$copyText(content).then(function (e) {
                alert('Copied')
                console.log('copied Text :',e.text)
                }, function (e) {
                alert('Can not copy')
                console.log(e)
                })
             }
        }
    }
</script>

<style>

</style>
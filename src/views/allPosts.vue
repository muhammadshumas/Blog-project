<template>
    <div class="container">
            <v-data-table
            :headers="headers"
            :items="posts"
            :items-per-page="5"
            class="elevation-1"
            >
  </v-data-table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
  export default {
 computed:{
     ...mapGetters(["getPosts"])
 },
 watch:{
     getPosts(posts){
         this.posts=posts;
         console.log(posts)
     }
 },
    data () {
      return {
        headers: [
          { 
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Title', value: 'title' },
          { text: 'Post Content', value: 'content' },
          { text: 'Tags', value: 'tags' },
          { text: 'Parent', value: 'parent' },
        ],
        posts: [],
      }
    },
    created(){
        this.$store.dispatch('fetchPosts');
    }
  }
</script>

<style scoped>

</style>
<template>
    
        <div class="container">

            <div class="search-page">
                <search></search>
                <posts></posts>
            </div>

        </div>

   
</template>

<script>
import search from '../components/search/search.vue';
import posts from '../components/search/posts.vue';
import {mapGetters} from 'vuex';
    export default {
        components:{
            search,
            posts
        },
        created(){
        this.$store.dispatch('fetchPosts');
        }
    }
</script>

<style>

</style>
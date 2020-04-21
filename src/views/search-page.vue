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
    export default {
        components:{
            search,
            posts
        }
    }
</script>

<style>

</style>
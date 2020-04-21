<template>
  <div> 
     <div class="text-center mt-4">
        <router-link to="/">Search</router-link> |
        <router-link class="ml-3" to="/createpost">Create Post</router-link> |
        <router-link class="ml-3" to="/allposts">All Posts</router-link> 
     </div>
     <router-view></router-view>
  

</div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
 
};
</script>

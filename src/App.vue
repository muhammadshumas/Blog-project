<template>
<div>
  <div class="text-center mt-4">
    <router-link to="/">Search</router-link>
    <router-link class="ml-3" to="/createPost">Create Post</router-link>
  </div>
  <router-view></router-view>
</div>
</template>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<template>
  <div>
    <app-add-post></app-add-post>
  </div>
</template>

<script>
import addPost from '../components/add-post'
export default {
  name:'createPost',
  components:{
    appAddPost:addPost
  } 
}
</script>
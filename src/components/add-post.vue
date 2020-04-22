<template>
  

</template>

<script>
  import axios from 'axios'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    created(){
      this.getPostsTitle()
    },
    data() {
      return {
        form: {
          title: '',
          content:'',
          parent: null,
          id:null,
          tags:''
        },
        parents: [{ text: 'Select One', value: null }],
      }
    },
    computed:{
      ...mapGetters([
        "getPosts"
      ])
    },
    watch:{
      getPosts(posts){
        posts.forEach(post=>{
          this.parents.push({text:post.title,value:post.title})
        })
      }
    },
    methods: {
      getPostsTitle(){
        this.parents=[{ text: 'Select One', value: null }]
        this.$store.dispatch('fetchPosts')
      },
      onSubmit(evt) {
        axios.post('/createpost',this.form).then(message=>{
          this.getPostsTitle()
          this.clearForm();
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      getParentId(event){
          this.form.id=event.target.options[event.target.options.selectedIndex].getAttribute('dataId')
      },
      clearForm(){
        this.form.title=this.form.content=this.form.tags='';
        this.parent=this.id=null
      }
    }
  }
</script>
<template>
  <div>
    <h1 class="text-center text-primary font-weight-bold">Create A Post</h1>
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <b-form @submit.prevent="onSubmit">
            <!-- <b-form-group id="parent" label="Select Parent Post (Optional)" label-for="parent" class="text-info">
              <b-form-select
                id="parent"
                v-model="form.parent"
                :options="parents"
                 @change="test($event)"
              ></b-form-select>
            </b-form-group> -->
            <select name="" id="" @change="getParentsId($event)" class="w-100 d-block" >
              <option v-for="(parent,index) in parents" :value="parent.text" :dataId="parent.id" :key="index">{{parent.text}}
              </option>   
            </select>

            <b-form-group
              id="title"
              label="Title:"
              label-for="title"
              class="text-info"
            >
              <b-form-input
                id="title"
                v-model="form.title"
                type="text"
                required
                placeholder="Enter Post Title"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="content"
              label="Content:"
              label-for="content"
              class="text-info">
              <b-form-textarea
                id="content"
                v-model="form.content"
                placeholder="Enter Post Content"
                rows="6"
                max-rows="6">
              </b-form-textarea>             
            </b-form-group>

            <b-form-group id="tags" label="Post Tags:" label-for="tags" class="text-info" 
            description="Seperate tags by commas">
              <b-form-input
                id="tags"
                v-model="form.tags"
                required
                placeholder="Enter Post Tags"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>

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
<template>
<v-app>
    <div class="container-fluid"> 
      <div class="row">
        <div class="col-lg-4 col-12">
              <!-- Search -->
          <div class="search  ">
                <h1 class="text-primary font-weight-bold">Search</h1>
                <div class="row">
                  <div class="col-12 py-0">
                  <form action="" @submit.prevent="search" class="bg-light p-3">

                  <div class="my-2 mx-auto">
                      <label for="search_title" class="text-info">Search By Title</label>
                      <input v-model="title" ref="title"  class="form-control" id="search_title" type="text" >
                  </div>
                  
                  <div class="my-2 mx-auto">
                      <label for="search_tag" class="text-info">Search By Tag</label>
                      <input v-model="tag" ref="tag" class="form-control" id="search_tag" type="text" >
                  </div>
                  <div>
                    <b-form-radio class="d-inline-block" v-model="searchedRadio" name="filter" value="main">Main</b-form-radio>
                    <b-form-radio class="d-inline-block ml-3" v-model="searchedRadio" name="filter" value="sub">Sub</b-form-radio>
                  </div>
                  <div class="my-2 mx-auto">
                      <input type="submit" class="btn btn-primary">
                  </div>
                  </form>
                  </div>
                </div>
                
          </div>

      <!-- Add Post Section -->
            <div class="create_post bg-light p-3">
              <h1 class="text-primary font-weight-bold">{{postFormHeading}}</h1>
                <div class="row">
                  <div class="col-12 py-0">
                    <b-form @submit.prevent="onSubmit">
                      <model-select :options="parents"
                                      v-model="parent"
                                      placeholder="select Main Post">
                      </model-select>

                      <b-form-group
                        id="title"
                        label="Title:"
                        label-for="title"
                        class="text-info"
                      >
                        <b-form-input
                          id="title"
                          v-model="$v.form.title.$model"
                          type="text"
                          :state="validateState('title')"
                          placeholder="Enter Post Title"
                        ></b-form-input>
                          <b-form-invalid-feedback
                          >Post Title is required with atleast 3 characters</b-form-invalid-feedback>

                      </b-form-group>

                      <b-form-group
                        id="content"
                        label="Content:"
                        label-for="content"
                        class="text-info">
                        <b-form-textarea
                          id="content"
                          v-model="$v.form.content.$model"
                          :state="validateState('content')"
                          placeholder="Enter Post Content"
                          rows="6"
                          required
                          max-rows="6"
                          >
                        </b-form-textarea>
                        <b-form-invalid-feedback
                        >Post Must have some content</b-form-invalid-feedback>         
                      </b-form-group>

                      <b-form-group id="tags" label="Post Tags:" label-for="tags" class="text-info" 
                      description="Seperate tags by commas">
                        <b-form-input
                          id="tags"
                          v-model="$v.form.tags.$model"
                          :state="validateState('tags')"
                          required
                          placeholder="Enter Post Tags"
                        ></b-form-input>
                        <b-form-invalid-feedback
                        >Post Must have atleast 1 tag</b-form-invalid-feedback>  
                      </b-form-group>

                      <b-button type="submit" variant="primary">Submit</b-button>
                    </b-form>
                  </div>
                </div>
            
          </div>
        </div>

        <div class="col-lg-8 col-12">
    <!-- all posts section -->
            <h1 class="text-primary font-weight-bold">All Posts</h1>
          <v-data-table
            :headers="headers"
            :items="searchedPosts"
            sort-by="calories"
            class="elevation-1 bg-light"
          >
          <template v-slot:top="{ pagination, options, updateOptions }">
            <v-data-footer 
              :pagination="pagination" 
              :options="options"
              @update:options="updateOptions"
              items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
          </template>
            <template v-slot:item.actions="{ item }">
              <v-icon 
              small
              class="mr-2"
              @click="copyPost(item.content)">
                mdi-content-copy
              </v-icon>
              <v-icon
                small
                class="mr-2"
                @click="editPost(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deletePost(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <p>No Post Found</p>
            </template>
          </v-data-table> 
          
        </div>
      </div>

  </div>
</v-app>

</template>

<script>
import axios from 'axios'
import { ModelSelect } from 'vue-search-select'
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: 'App',
  created(){
    this.fetchAllPosts()
  },
  mounted(){
    document.querySelectorAll('.v-data-footer')[1].remove()
    this.$toastr.defaultPosition = "toast-top-center";
    this.$toastr.defaultTimeout = 2000;
    this.$toastr.defaultProgressBar = false;
  },
  data() {
    return {
      posts: [],
      searchedPosts: [],

      // search posts
       title:'',
       tag:'',
       post:[],
      searchedRadio: 'main',
      //  add posts
        parent: {
          value: '',
          text: '',
        },
      postFormHeading:'Create Post',
      editMode:false,
       form: {
          title: '',
          content:'',
          parentId: null,
          parent:null,
          id:null,
          tags:'',
        },
        parents: [{ text: 'Select One', value: null }],
           
         //data table   
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Post Content', value: 'content' },
        { text: 'Tags', value: 'tags' },
        { text: 'Main', value: 'parent' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],       
    }
  },
  validations: {
    form:{
      title: {
      required,
      minLength: minLength(4)
      },
      content:{
        required
      },
      tags:{
        required
      }
    }
  
  },
  watch:{
    title(newTitle){
      if(newTitle==='' && this.tag===''){
        this.searchedPosts=this.posts
      }
    },
    tag(newTag){
      if(newTag==='' && this.title===''){
        this.searchedPosts=this.posts
      }
    },
    posts(posts){
      this.parents=[]
      posts.forEach(post=>{
        this.parents.push({text:post.title,value:post.title,id:post.id})
      })
    }
  },
   methods:{
    // Search posts
    search(){
          if(this.title!='' && this.tag==''){
            this.searchedPosts=[];
            this.searchedPosts=this.posts.filter(post=>{
              const postFound= post.title.toLowerCase().includes(this.title.toLowerCase())
              if(postFound){
                if(this.searchedRadio.toLowerCase()===''){
                  return post
                }else if(this.searchedRadio.toLowerCase()==='main' && !post.parentId){
                  return post
                }else if(this.searchedRadio.toLowerCase()==='sub' && post.parentId){

                  return post
                }
              }
            })
            this.$refs.title='';        
          }
                    
          else if(this.tag!='' && this.title==''){   
            
            this.searchedPosts=[];
            this.searchedPosts=this.posts.filter(post=>{
              const postFound= post.tags.find((tag)=>{
                return tag.toLowerCase().includes(this.tag)
              })
              
              if(postFound){
                if(this.searchedRadio.toLowerCase()===''){
                  return post
                }else if(this.searchedRadio.toLowerCase()==='main' && !post.parentId){
                  return post
                }else if(this.searchedRadio.toLowerCase()==='sub' && post.parentId){

                  return post
                }
              }
            })
            this.$refs.tag='';
            }
              
                
          },
               

            fetchAllPosts(){
              axios.get('/getposts').then(posts=>{
                this.posts=posts.data;
                this.searchedPosts=posts.data
                this.posts.forEach(post=>{
                  post.tags=post.tags.split(',')
                })
              }).catch(err=>{
                console.log(err)
              }) 
            },
            validateState(name) {
              const { $dirty, $error } = this.$v.form[name];
              return $dirty ? !$error : null;
            },
            // reset () {
            //   this.parent = {}
            // },
            // selectFromParentComponent1 () {
            //   // select option from parent component
            //   this.parent = this.parents[0]
            // },
            editPost(post){
              this.postFormHeading='Edit Post'
              this.editMode=true;
              this.form=this.searchedPosts.find(p=>{
                if(post.id===p.id && post.parentId===p.parentId){
                  p.tags=p.tags.join()
                  this.parent.value=p.parent
                  return p
                }
              })
            },
            copyPost(content) {
                this.$copyText(content).then( (e)=> {
                this.$toastr.s('Copied')
                }, function (e) {
                alert('Can not copy')
                console.log(e)
                })
             },

      //Add post Methods
      onSubmit(evt) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        this.form.parent=this.parent.value;
        this.form.parentId=this.parent.id || null
        console.log(this.form)
        const formData={...this.form};
        if(!this.editMode){
          return axios.post('/createpost',formData).then(data=>{
            this.$toastr.s('Post Added')
            this.clearForm();
            this.fetchAllPosts()

          })
          .catch((err)=>{
            console.log(err)
          })
        }
      
        axios.post(`/editPost/${formData.id}`,formData).then(message=>{
          const editedPostIndex=this.posts.findIndex(post=>{
            return post.id===formData.id && post.parentId===formData.parentId
          })
          this.editMode=false;
          this.postFormHeading='Create Post'
          this.$toastr.s('Post Edited')
          this.clearForm()
          this.fetchAllPosts()
        })

      },
      clearForm(){
        this.form.title=this.form.content=this.form.tags='';
        this.id=null
        this.parent = {text:'',value:''}
        this.$nextTick(() => {
          this.$v.$reset();
        });
      },
        //data table
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      // deleteItem (item) {

      //   const index = this.desserts.indexOf(item)
      //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      // },
      deletePost(post){
        if(confirm('Are you sure you want to delete this item?')){
          console.log(post.parentId)
          axios.post(`/deletepost/${post.id}`,{parentId:post.parentId}).then(data=>{
          this.$toastr.s("Post Deleted", "Post Deleted");
          this.fetchAllPosts()
          }).catch(err=>{
            console.log(err)
          })
        }

      },
    },

    components: {
      ModelSelect
    }

};
</script>


<style>
  html{
    font-size:100% !important;
  }
  .v-data-footer{
    justify-content: flex-start !important;
    background-color: #e8e8e8;
  }

  @media(max-width:991px){
    html{
      font-size:90% !important;
    }
  }
</style>
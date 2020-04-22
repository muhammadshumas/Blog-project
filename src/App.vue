<template>
  <div class="container"> 
    
    <!-- Search Section -->
    <section class="search  mb-5 ">
          <h1 class="text-primary font-weight-bold">Search</h1>
          <div class="row">
            <div class="col-12">
            <form action="" @submit.prevent="search" class="bg-light p-3">

            <div class="my-2 mx-auto">
                <label for="search_title" class="text-info">Search Title</label>
                 <input v-model="title" ref="title"  class="form-control" id="search_title" type="text" >
            </div>
            
            <div class="my-2 mx-auto">
                <label for="search_tag" class="text-info">Search Tag</label>
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

                  <div class="blog mt-5 bg-light p-3" >
                   <div v-for="(post,index) in searchedPosts" :key="index">
                        <h1>{{post.title}}</h1>
                        <p>{{post.content}}</p>

                        <div class="tags my-3">
                            <h5>Tags</h5>
                            <span class="ml-1 text-primary font-weight-bold"  v-for="(tag,i) in post.tags" :key="i">{{tag}}</span>
                        </div>

                        <div class="actions my-5">
                            <b-button  variant="primary" @click="copyPost(post.content)">Copy to clipboard</b-button>
                            <b-button class="ml-2" variant="outline-secondary" @click="editPost(post.id,post.parentId)">Edit</b-button>
                            <b-button class="ml-2" variant="success" @click="deletePost(post.id,post.parentId)">Delete</b-button>
                        </div>
                   </div>

                </div>
            </div>
          </div>
          
    </section>

    <!-- Add Post Section -->
    <section class="create_post mb-5 bg-light p-3">
      <h1 class="text-primary font-weight-bold">{{postFormHeading}}</h1>
        <div class="row">
          <div class="col-12">
            <b-form @submit.prevent="onSubmit">
              <select name="" id="" @change="setParent($event)" class="w-100 d-block border p-2 bg-white" >
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
     
  </section>

  <!-- all posts section -->
  <section class="all_posts">
    <h1 class="text-primary font-weight-bold">All Posts</h1>
    <v-data-table
            :headers="headers"
            :items="posts"
            :items-per-page="5"
            class="elevation-1"
            >
    </v-data-table>
  </section>

</div>

</template>

<script>
import HelloWorld from './components/HelloWorld';
import axios from 'axios'
export default {

  created(){
    this.fetchAllPosts()
  },

  name: 'App',
  data() {
    return {
      posts: [],
      searchedPosts: [],

      // search posts
       title:'',
       tag:'',
       post:[],
      searchedRadio: '',
      //  add posts
      postFormHeading:'Create Post',
      editMode:false,
       form: {
          title: '',
          content:'',
          parentId: null,
          parent:'None',
          id:null,
          tags:''
        },
        parents: [{ text: 'Select One', value: null }],
           
         //data table   
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
          { text: 'Main', value: 'parent' },
        ],
        
    }
  },
  watch:{
    posts(posts){
      this.posts=posts
      this.parents=[{ text: 'Select One', value: null }]
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
                          console.log('all')
                          return post
                        }else if(this.searchedRadio.toLowerCase()==='main' && !post.parentId){
                          console.log('main')
                          return post
                        }else if(this.searchedRadio.toLowerCase()==='sub' && post.parentId){
                          console.log('sub')
                          return post
                        }
                      }
                    })
                  // this.posts.forEach((post) => {
                  //   if (post.title.toLowerCase().includes(this.title.toLowerCase()))
                  //   { 
                  //     if(this.searchedRadio===''){
                  //       this.searchedPosts.push(post)
                  //     }
                  //     else if(this.searchedRadio.toLowerCase()==='main' && !this.post.parent){
                  //       this.searchedPosts.push(post)
                  //     }
                  //     else if(this.searchedRadio.toLowerCase()==='sub' && this.post.parent){
                  //       this.searchedPosts.push(post)
                  //     }
                          
                  //   }
                  // })

                    this.$refs.title='';        
                  }
                           
                  else if(this.tag!='' && this.title==''){   
                    
                    this.searchedPosts=[];  
                    
                    this.posts.forEach((post) => {
                    post.tags.forEach((tag) => {
                    if (tag == this.tag) {
                        this.searchedPosts.push(post);
                      }
                     })
                    })
                        this.$refs.tag='';
                   }
                      
                       
                  },
               

            fetchAllPosts(){
              axios.get('/getposts').then(posts=>{
                this.posts=posts.data;
                this.posts.forEach(post=>{
                  post.tags=post.tags.split(',')
                })
              }).catch(err=>{
                console.log(err)
              }) 
            },
            
            deletePost(id,parentId){
                axios.post(`/deletepost/${id}`,{parentId}).then(data=>{
                  
                this.posts=this.posts.filter(post=>{
                  return post.id!==id && post.parent!==parent
                })
                this.searchedPosts=this.searchedPosts.filter(post=>{
                  return post.id!==id && post.parent!==parent
                })
              }).catch(err=>{
                console.log(err)
              }) 
            },
            editPost(id,parentId){
              this.postFormHeading='Edit Post'
              this.editMode=true;
              this.form=this.posts.find(post=>{
                if(post.id===id &&parentId===post.parentId){
                  post.tags=post.tags.join()
                  return post
                }
              })
            },
            copyPost(content) {
                this.$copyText(content).then(function (e) {
                alert('Copied')
                console.log('copied Text :',e.text)
                }, function (e) {
                alert('Can not copy')
                console.log(e)
                })
             },

      //Add post Methods
      onSubmit(evt) {
        const formData={...this.form};
        console.log(formData)
        if(!this.editMode){
          
          return axios.post('/createpost',formData).then(message=>{
            this.posts.push(formData)
          }).then(()=>{
            this.clearForm();
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      
        axios.post(`/editPost/${formData.id}`,formData).then(message=>{
          const editedPostIndex=this.posts.findIndex(post=>{
            return post.id===formData.id && post.parentId===formData.parentId
          })
          this.posts.splice(editedPostIndex,1,formData)
          this.searchedPosts.splice(editedPostIndex,1,formData)
          this.editMode=false;
          this.postFormHeading='Create Post'
          this.clearForm()
        })

      },

      setParent(event){
          this.form.parent=event.target.options[event.target.options.selectedIndex].value
          this.form.parentId=event.target.options[event.target.options.selectedIndex].getAttribute('dataId')

      },
      clearForm(){
        this.form.title=this.form.content=this.form.tags='';
        this.parent=this.id=null
      }  
    },



};
</script>

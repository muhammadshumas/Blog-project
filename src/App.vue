<template>
    <main>
      <div class="container-fluid">
        <div class="row">
          
          <div class="col-lg-6 col-12">
            <div class="d-flex flex-column flex-sm-row flex-lg-column h-100 justify-content-between justify-content-lg-start">
              <form @submit.prevent="search" class="form rounded-border-radius">
                <h5 class="form-headings text-capitalize">search</h5>
                  <div class="form-group">
                    <label class="input-label" for="title">Title</label>
                    <input v-model="title" type="text" class="form-control inputs" id="title">
                  </div>
                  <b-form-group class="search-form__radios mt-2">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="searchedRadio"
                      :options="options"
                      name="radio-options"
                    ></b-form-radio-group>
                  </b-form-group>

                  <div class="form-group">
                    <label class="input-label" for="title">Search By Tags </label>
                    <input v-model="tag" type="text" class="form-control inputs" id="tag">
                  </div>
                  <button class="btn btn-primary button">Submit</button>

              </form>
              
              <form @submit.prevent="onSubmit" class="form rounded-border-radius mt-lg-5 mt-md-0 mt-5">
                <h5 class="form-headings text-capitalize">Insert</h5>
                  <div class="form-group">
                    <label class="input-label" for="title">Select Parent</label>
                    <model-select :options="parents"
                                    v-model="parent"
                                    placeholder="" 
                                    class="inputs search-form__select">
                    </model-select>
                  </div>
                  <div class="form-group">
                    <label class="input-label" for="addTitle">Title</label>
                    <input type="text" class="form-control inputs" id="addTitle" v-model="form.title">
                  </div>
                  <b-form-group
                    id="content"
                    label="Content:"
                    label-for="content">
                    <b-form-textarea
                      id="content"
                      v-model="form.content"
                      placeholder="Enter Post Content"
                      rows="6"
                      required
                      max-rows="6"
                      >
                    </b-form-textarea>

                  </b-form-group>
                    <div class="form-group">
                      <label class="input-label" for="tags">Tags</label>
                      <input type="text" class="form-control inputs" id="tags" v-model="form.tags" required>
                    </div>
                    <div class="d-flex flex-wrap ml-n2">
                      <p class="tag added-tags text-center ml-2" v-if="addedTag!==''" v-for="(addedTag,index) in addedTags" :key="index">{{addedTag}}</p>
                    </div>

                  <button class="btn btn-primary button">Submit</button>

              </form>
            </div>
          </div>

          <div class="col-lg-6 col-12">
            <div class="d-flex d-lg-block justify-content-between flex-wrap">
              <div class="post text-white d-flex flex-column flex-lg-row" :class="{'mb-lg-0':index+1===searchedPosts.length}" v-for="(post,index) in searchedPosts" :key="post.id">
                <div class="post__actions d-flex d-lg-block">
                  <div class="post__actions__copy rounded-circle" @click.stop="copyPost(post.content)">
                    <i class="icon-hardware position-absolute "></i>
                  </div>
                  <div class="post__actions__edit rounded-circle ml-2 ml-lg-0" @click.stop="editPost(post)">
                    <i class="icon-edit position-absolute"></i>
                  </div>
                  <div class="post__actions__delete rounded-circle ml-2 ml-lg-0" @click.stop="deletePost(post)">
                    <i class="icon-bin position-absolute"></i>
                  </div>
                </div>

                <div class="post__content flex-grow-1">
                  <p class="m-0 post__content__heading font-weight-bold">{{post.title}}</p>
                  <p class="post__content__main m-0 mt-3 pb-4 border-bottom">{{post.content}}</p>
                  <div class="post__content__tags d-flex mt-3 flex-wrap text-center ml-n2">
                    <p class="tag ml-2" v-for="(tag,index) in post.tags" :key="index" v-if="tag!==''">
                      {{tag}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
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
      allTags:[],
      addedTags:[],
      options: [
                { text: 'Main', value: 'main' },
                { text: 'All', value: 'all' },
              ],
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
               
    }
  },
  watch:{
    title(newTitle){
      if(newTitle==='' && this.tag===''){
        this.searchedPosts=this.posts
      }
    },
    tag(newTag){
      if(this.tag==='' && this.title===''){
        this.searchedPosts=this.posts
      }
    },
    posts(posts){
      this.parents=[]
      posts.forEach(post=>{
        this.parents.push({text:post.title,value:post.title,id:post.id})
      })
    },
    form:{
        handler(formValues){
          this.addedTags=formValues.tags.split(',').map(addedTag=>{
            return addedTag.substring(0,30) 
          })
          this.form.tags=this.addedTags.join()          
        },
        deep:true
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
                if(this.searchedRadio.toLowerCase()==='' || this.searchedRadio.toLowerCase()==='all'){
                  return post
                }else if(this.searchedRadio.toLowerCase()==='main' && !post.parentId){
                  return post
                }
              }
            })
            this.$refs.title='';        
          }
                    
          else if(this.tag!='' && this.title==''){   
            console.log(this.tag)
            this.searchedPosts=[];
            this.searchedPosts=this.posts.filter(post=>{
              return post.tags.find((tag)=>{
                return tag.toLowerCase().includes(this.tag)
              })
              
              
              // if(postFound){
              //   if(this.searchedRadio.toLowerCase()===''){
              //     return post
              //   }else if(this.searchedRadio.toLowerCase()==='main' && !post.parentId){
              //     return post
              //   }else if(this.searchedRadio.toLowerCase()==='sub' && post.parentId){

              //     return post
              //   }
              // }
            })
            this.$refs.tag='';
            }   
          },
               

            fetchAllPosts(){
              axios.get('/getposts').then(posts=>{
                this.posts=posts.data;
                this.posts.forEach(post=>{
                  post.tags=post.tags.split(',')
                  post.tags.forEach(tag=>{
                    this.allTags.push({ text: tag, value: tag })
                  })
                  
                })
                this.searchedPosts=[...this.posts]
              }).catch(err=>{
                console.log(err)
              }) 
            },
            reset () {
              this.parent = {}
            },
            selectFromParentComponent1 () {
              // select option from parent component
              this.parent = this.parents[0]
            },
            editPost(post){
              this.postFormHeading='Edit Post'
              this.editMode=true;
              let editedPostIndex=this.searchedPosts.findIndex(p=>{
                if(post.id===p.id && post.parentId===p.parentId){
                  this.parent.id=p.parentId
                  this.parent.value=p.parent
                  p.tags=p.tags.join()            
                  return p
                }
              })
              this.form=this.searchedPosts[editedPostIndex]
              console.log(this.form)
              this.searchedPosts.splice(editedPostIndex,1,{})

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
        this.form.parent=this.parent.value;
        this.form.parentId=this.parent.id || null
        const formData={...this.form};

        if(!this.editMode){
          return axios.post('/createpost',formData).then(data=>{
            console.log(data)
            this.$toastr.s('Post Added')
            this.clearForm();
            this.fetchAllPosts()

          })
          .catch((err)=>{
            console.log(err)
          })
        }
        axios.post(`/editPost/${formData.id}`,formData).then(message=>{
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
        this.parent = {text:'',value:''},
        this.addedTags=[]
      },

      deletePost(post){
        if(confirm('Are you sure you want to delete this item?')){
          console.log(post.parentId)
          axios.post(`/deletepost/${post.id}`).then(data=>{
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
/* fonts used */
/* font-family: 'PT Sans', sans-serif;
font-family: 'Poppins', sans-serif;
font-family: 'Open Sans', sans-serif; */
@font-face{
  font-family: 'louisgeorgecafe';
  src:url('./assets/fonts/Louis George Cafe Bold.ttf')
}

@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600|PT+Sans:700|Poppins:300,600&display=swap');

/* icons */
@import url('./assets/icons/demo-files/demo.css');
@import url('./assets/icons/style.css');

  html{
    font-size:100% !important;
  }
  main{
    padding:2rem 0rem
  }

  textarea{
    resize: none !important;
    border-color:#d6d6d6 !important;
    border-radius:11px !important;
  }
  textarea:focus{
    box-shadow: 0 0 0 0.2rem rgba(13, 145, 135, 0.25) !important;
  }
  .ml-md-screen{
    margin-left:8px
  }
  .container-fluid{
    padding-left:4.8125rem !important;
    padding-right:6.5rem !important;
  }
  .row>div{
    max-height:100vh;
    overflow-y:auto;
  }
  .rounded-border-radius{
    border-radius: 10px;
  }
  .form{
    padding:1.8125rem 6.5625rem 1.8125rem 3.4375rem; 
    box-shadow:0px 0px 20px 8px #f0f0f0;
  }
  form.form:nth-of-type(2){
    margin-bottom:0.8rem;
  }
  .form-headings{
    font-size:1.25rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: bold;
    color:#0d9187;
    margin-bottom:2.3rem;
  }

  .input-label,#content__BV_label_{
    font-family:'louisgeorgecafe';
    font-size:1.1106rem;
    font-weight:bold;
    padding-left:0.9375rem;
    margin-bottom:0.8125rem;
  }
  .inputs{
    border-radius: 30px !important;
    padding:21px 20px !important;
    border-color:#d6d6d6 !important;
  }
  .inputs:focus{
    box-shadow: 0 0 0 0.2rem rgba(13, 145, 135, 0.25) !important;
  }
  .button{
    background-color: #24a99d !important;
    font-family: 'Poppins', sans-serif;
    font-weight: 600 !important;
    border-color: #24a99d !important;
    padding:0.5rem 1.75rem !important;
    border-radius: 30px !important;
    margin:0.5rem 0rem 0rem 0.9375rem;
    box-shadow: -1px -1px 0px 1px #16675f;
  }
  .tag{
    font-family: Arial, Helvetica, sans-serif;
    font-size:0.875rem;
    background:white;
    border-radius: 20px;
    padding:0.4375rem 1rem;
    color:black;
    box-shadow: 1px 1px 0px 1px #d2d2d2;
  }

  .custom-control-input:checked ~ .custom-control-label::before{
    border-color: #0d9187 !important;
    background-color: #0d9187 !important;
  }
  .custom-control-label::before{
    border: #d6d6d6 solid 1px;
  }
  .custom-radio .custom-control-label::before {
    border-radius: 0.25em !important;
  }
  .search-form__radios{
    padding-left:0.9375rem;
    margin-bottom: 1.5rem
  }
  .search-form__select{
    padding:0.875rem 1.25rem !important;
  }
  .search-form__select input{
    margin-top:11px;
  }
  .ui.selection.dropdown>.delete.icon, .ui.selection.dropdown>.dropdown.icon, .ui.selection.dropdown>.search.icon{
    top: 1.085714em !important;
  }

  .post{
    background-color:#029f92;
    padding:1.1875rem 2.375rem 1.1875rem 2.375rem;
    font-family: 'Open Sans', sans-serif;
    border-radius:10px;
    margin-bottom:2.5rem;
  }
  .post__actions__copy,.post__actions__edit,.post__actions__delete{
    position: relative;
    height:30px;
    width:30px;
    border:solid 1px white;
    margin-bottom:1.25rem;
    cursor:pointer;
  }
    .post__actions__copy i,.post__actions__edit i,.post__actions__delete i{
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      font-size:0.9rem;
    }
    .post__content{
      margin-left:1.6875rem;
    }
    .post__content__heading{
      margin-top:-0.375rem !important
    }

  @media(max-width:1199px){
    html{
      font-size:90% !important;
    }
    .container-fluid{
      padding-left:15px !important;
      padding-right:15px !important;
    }
    .form {
      padding: 1.8125rem 2rem 1.8125rem 2rem;
    }
  }
  @media(max-width:991px){
    main {
    padding: 1rem 0rem;
    }
    .row>div{
    max-height:initial;
    }
    .inputs {
      padding: 0.9375rem 1.25rem !important;
    }
    .search-form__select {
      padding: 0.6375rem 1.25rem !important;
    }
    .ui.selection.dropdown>.delete.icon, .ui.selection.dropdown>.dropdown.icon, .ui.selection.dropdown>.search.icon {
      top: 0.685714em !important;
    }
    .form,.post{
      flex-basis:49%;
      max-width:49%;
      padding: 1.1875rem 1.5rem 1.1875rem 1.5rem;
    }
    .post {
    margin-bottom: 1rem;
    }
    .post__content {
      margin-left: 0rem;
    }
    .post__actions__copy, .post__actions__edit, .post__actions__delete {
      margin-bottom: 0.75rem;
    }
    form.form:nth-of-type(2){
    margin-bottom:0rem;
    }
    .tag {
      padding: 0.4375rem 0.5rem;
    }

  }
  @media(max-width:767px){
    .form,.post{
      flex-basis:100%;
      max-width:100%;
    }

    .ml-md-screen{
      margin-left:0px
    }
    .ml-sm-screen{
      margin-left:8px;
    }
  }
  
  @media(max-width:575px){ 
    .post {
        padding: 1.1875rem 1.5rem 1.1875rem 1.5rem;
    }
  }
  
</style>


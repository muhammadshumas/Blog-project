<template>
  <div>
    <h1 class="text-center text-primary font-weight-bold">Create A Post</h1>
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <b-form @submit.prevent="onSubmit">
            <b-form-group id="parent" label="Select Parent Post(Optional)" label-for="parent" class="text-info">
              <b-form-select
                id="parent"
                v-model="form.food"
                :options="parents"
              ></b-form-select>
            </b-form-group>

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

            <b-form-group id="tags" label="Post Tags:" label-for="tags" class="text-info">
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
  import axios from "axios"
  export default {
    data() {
      return {
        form: {
          title: '',
          name: '',
          content:'',
          parent: null,
          checked: []
        },
        parents: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      }
    },
    methods: {
      onSubmit(evt) {
        axios.post('/createpost',this.form).then(message=>{
          console.log(message)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
    }
  }
</script>
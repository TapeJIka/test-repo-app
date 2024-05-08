<template>
  <div class="container">
    <div style="display: flex; justify-content: center; flex-direction: column; width: 100%; gap: 20px">
      <p v-if="user" style="font-size: 20px; font-weight: bold; color: white"> User info :</p>
      <p v-if="user" style="font-size: 15px; font-weight: bold; color: white"> Username: {{user.username}}</p>
      <p v-if="user" style="font-size: 15px; font-weight: bold; color: white"> Email: {{user.email}}</p>
    </div>
    <div style="display: flex; justify-content: center; flex-direction: column; width: 100%; gap: 20px">
      <div style="display: flex; justify-content: center; width: 100%">
        <p style="font-size: 20px; font-weight: bold; color: white">Want to upload new video ?</p>
      </div>
      <form style="border: 1px lightgray solid; border-radius: 20px; padding: 20px; margin-top: 20px">
        <div class="mb-3">
          <label class="form-label" style="color: lightgray;">Title</label>
          <input type="text" v-model="form.title" class="form-control" style="background-color: #1d1d23; border: 1px lightgray solid; border-radius: 10px; color: lightgray">
          <p v-for="error in formErrors.title" style="color: red">{{error}}</p>
        </div>
        <div class="mb-3">
          <label class="form-label" style="color: lightgray;">Description</label>
          <input type="text" v-model="form.description" class="form-control" style="background-color: #1d1d23; border: 1px lightgray solid; border-radius: 10px; color: lightgray">
          <p v-for="error in formErrors.description" style="color: red">{{error}}</p>
        </div>
        <div style="display: flex; justify-content: center; gap: 10px; width: 100%">
          <div style="display: flex; justify-content: center;">
            <input type="file" @change="Uploaded_file()" ref="file" style="color: white">
            <p v-for="errors in formErrors.file" style="color: red">{{errors}}</p>
          </div>
        </div>
        <button type="button" @click="create()" class="btn btn-primary" style="background-color: transparent; border: 1px lightgray solid">Submit</button>
        <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 5px;align-items: center">
          <p style="color: white">Add categories to video: </p>
          <div class="dropdown" style="align-items: center; vertical-align: center; display:flex; justify-content: center">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="align-items: center; vertical-align: center; display:flex; justify-content: center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg>
            </button>
            <ul class="dropdown-menu">
              <button  v-for="category in categories" @click="addCategoryToVideo(category)" style="background-color: transparent; color: black">
                {{category.title}}
              </button>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  data() {
    return {
      user: null,
      categories: [],
      form: {
        title: null,
        description: null,
        file: null,
        category_id: [],
      },
      formErrors: {
        title: null,
        description: null,
        file: null,
        category_id: [],
      },
    }
  },
  mounted() {
    this.axios.get('/me').then(response =>{
      this.user = response.data
    })
    this.axios.get('/category').then(response => {
      this.categories = response.data.data
    })
  },
  methods: {
    async Uploaded_file() {
      this.form.file = this.$refs.file.files[0];
    },
    async create() {
      const fd = new FormData();
      if (this.form.file) {
        fd.append('file', this.form.file)
        fd.append('title', this.form.title)
        fd.append('description', this.form.description)
        for (var i = 0; i < this.form.category_id.length; i++) {
          fd.append('category_id[]', this.form.category_id[i]);
        }
      }
      this.formErrors = {
        title: null,
        description: null,
        file: null,
        category_id: [],
      }
      this.axios.post('video', fd).then().catch(e => {
        console.log(e)
        Object.keys(e.response.data.errors).forEach((key) => {
          this.formErrors[key] = e.response.data.errors[key]
        })
      })
      router.push('/')
    },
    addCategoryToVideo(category) {
      console.log(category.id)
      this.form.category_id.push(category.id)
      console.log(this.form.category_id)
    }
  },
}
</script>
<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
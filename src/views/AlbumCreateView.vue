<template>
  <div style="display: flex; justify-content: center">
    <form style="border: 1px lightgray solid; border-radius: 20px; padding: 20px; margin-top: 20px">
      <div class="mb-3">
        <label class="form-label" style="color: lightgray;">Title</label>
        <input type="text" v-model="form.title" class="form-control" style="background-color: #1d1d23; border: 1px lightgray solid; border-radius: 10px; color: lightgray">
        <p v-for="error in formErrors.title" style="color: red">{{error}}</p>
      </div>
      <button type="button" @click="create()" class="btn btn-primary" style="background-color: transparent; border: 1px lightgray solid">Submit</button>
    </form>
  </div>
</template>
<script>
import router from "@/router";

export default {
  data() {
    return {
      form: {
        title: null,
      },
      formErrors: {
        title: null,
      }
    }
  },
  methods: {
    async create() {
      this.formErrors = {
        title: null,
      }
      this.axios.post(`/album`, this.form).then(response => {
        console.log(response.data)
        router.push('/albums')
      }).catch(e => {
        if (e) {
          Object.keys(e.response.data.errors).forEach((key) => {
            this.formErrors[key] = e.response.data.errors[key]
          })
        }
      })
    }
  }
}
</script>
<style>
</style>
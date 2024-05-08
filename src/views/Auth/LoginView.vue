<template>
  <div class="container" style="display: flex; justify-content: center; width: 100%; height: 100%">
    <div style="width: 30%; margin-top: 40px;">
      <form style="border: 1px lightgray solid; border-radius: 20px; padding: 20px">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label" style="color: lightgray;">Email address</label>
          <input type="email" v-model="form.email" class="form-control" style="background-color: #1d1d23; border: 1px lightgray solid; border-radius: 10px; color: lightgray">
          <p v-for="error in formErrors.email" style="color: red">{{error}}</p>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label" style="color: lightgray;">Password</label>
          <input type="password" v-model="form.password" class="form-control" style="background-color: #1d1d23; border: 1px lightgray solid; border-radius: 10px; color: lightgray">
          <p v-for="error in formErrors.password" style="color: red">{{error}}</p>
        </div>
        <div class="">
          <p v-for="error in formErrors.data" style="color: red; font-size: 10px">{{error}}</p>
        </div>
        <button type="button" @click="login()" class="btn btn-primary" style="background-color: transparent; border: 1px lightgray solid">Submit</button>
        <div class="">
          <a class="router-link" href="#/register">Don't have an account?</a>
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
      form: {
        email: null,
        password: null,
      },
      formErrors: {
        email: null,
        password: null,
        data: null,
      },
    }
  },
  methods: {
    async login() {
      this.formErrors = {
        email: null,
        password: null,
        data: null,
      }
      this.axios.post('/login', this.form).then(response => {
        window.localStorage.setItem('access_token', response.data.data.access_token)
        window.localStorage.setItem('user', JSON.stringify(response.data.data.user))
        this.axios.defaults.headers.authorization = 'Bearer ' + response.data.data.access_token
        router.push('/')
      }).catch(e => {
        this.formErrors.data = e.response.data.data;
        if (e.response.data?.errors) {
          Object.keys(e.response.data.errors).forEach((key) => {
            this.formErrors[key] = e.response.data.errors[key]
            console.log(this.formErrors.data)
          })
        }
      })
    }
  },
}
</script>
<style scoped>
.router-link {
  color: white;
  text-decoration: none;
  padding: 2px;
}
</style>
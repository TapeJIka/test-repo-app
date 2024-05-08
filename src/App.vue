<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #1d1d23 !important;">
    <div class="container-fluid">
      <div class="home-button" style="width: 50%; padding-left: 20px;">
        <button @click="homeView" style="border: 2px solid white; background-color: transparent; color: white; border-radius: 10px; font-weight: bold">YouTube</button>
      </div>
      <div class="profile-button" style="width: 50%; display:flex; justify-content: end">
        <a v-if="!token" class="navbar-brand" href="#/login" style="color: white">Log in</a>
        <a v-if="token" class="navbar-brand" href="#/profile" style="color: white">Profile</a>
      </div>
    </div>
  </nav>
  <div class="body-container">
    <div class="navigation-side-bar">
      <sideBar/>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import sideBar from "@/components/sideBar";
import router from "@/router";
export default {
  components: {sideBar},
  data() {
    return {
      user: null,
      token: null,
    }
  },
  mounted() {
    if (localStorage.getItem('access_token')) {
      this.token = true
    }
  },
  methods: {
    async getUser() {
      this.axios.get('/me').then(response => {
        this.user = response.data
        console.log(response.data)
      })
    },
    homeView () {
      router.push('/')
    }
  }
}
</script>
<style>
body {
  background-color: #1d1d23!important;
}
.body-container {
  display: flex;
  justify-content: start;
  width: 100%;
  height: 100vh;
}
.navigation-side-bar {
  width: 15%;
}
.container {
  padding: 0;
  margin: 0;
  margin-right: 0!important;
  margin-left: 0 !important;
  width: 90%!important;
}
</style>
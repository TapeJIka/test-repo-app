<template>
  <div class="side-bar">
    <button @click="homeView" class="side-bar-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="house-icon bi bi-house-fill" viewBox="0 0 16 16" style="width: 23px; height: 23px">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
      </svg>
      <p class="button-text" style="padding: 0; margin: 0; font-size: 20px ">Home</p>
    </button>
    <button class="side-bar-button" v-if="token" @click="albumView">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-list-nested" viewBox="0 0 16 16" style="width: 23px; height: 23px">
        <path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"/>
      </svg>
      <p class="button-text" style="padding: 0; margin: 0; font-size: 20px ">Albums</p>
    </button>
    <button @click="categoriesView" class="side-bar-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16" style="width: 23px; height: 23px">
        <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"/>
        <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"/>
      </svg>
      <p class="button-text" style="padding: 0; margin: 0; font-size: 20px ">Categories</p>
    </button>
  </div>
</template>
<script>
import router from "@/router";
export default {
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
    albumView() {
      router.push('/albums')
    },
    homeView () {
      router.push('/')
    },
    categoriesView () {
      router.push('/categories')
    }
  }
}
</script>
<style>
.side-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 96vh;
  background-color: transparent;
  color: white;
  padding-left: 10px;
  gap: 2px;
}
.side-bar-button {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 10px;
  align-items: center;
  width: 90%;
  height: fit-content;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  transition: .2s;
  color: white;
  margin-top: 10px;
}
.side-bar-button:hover {
  background-color: rgba(36, 36, 44, 0.93);
  transition: .2s;
}
@media screen and (max-width: 1313px) {
  .button-text {
    display: none;
  }
  .side-bar {
    padding: 0;
  }
  .side-bar-button {
    justify-content: center;
    border-radius: 30px;
    width: fit-content;
    transition: .2s;
  }
  .side-bar-button:hover {
    scale: 1;
    transition: .2s;
  }
  .side-bar-button > svg {
    width: 24px !important;
    height: 24px !important;
    transition: .2s;
  }
  .side-bar-button > svg:hover {
    width: 26px !important;
    height: 26px !important;
    transition: .2s;
  }
}
</style>
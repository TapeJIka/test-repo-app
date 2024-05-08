<template>
  <div style="display: flex; flex-direction: column; justify-content: start; gap: 20px; width: 100%; height: 100%;">
    <div style="display: flex; width: 90%; height: 60%; padding: 0; margin: 0">
      <video controls v-if="video?.file" :src="`${video.file}`" type="video/mp4" autoplay style="width: 100%; height: 100%">
<!--        <source :src="`${video.file}`" type="video/mp4">-->
      </video>
    </div>
    <div style="display: flex; flex-wrap: wrap; width: 100%;">
      <div style="width: 100%; display: flex; flex-wrap: wrap">
        <div style="width: 50%; display: flex; flex-wrap: wrap; gap: 5px; text-wrap: normal; word-break: break-word">
          <p style="color: white; text-wrap: avoid">
            {{video.title}}
          </p>
        </div>
        <div style="width: 50%; display: flex; flex-wrap: wrap; gap: 5px;align-items: center">
          <p style="color: white">Add video to album: </p>
          <div class="dropdown" style="align-items: center; vertical-align: center; display:flex; justify-content: center">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="align-items: center; vertical-align: center; display:flex; justify-content: center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg>
            </button>
            <ul class="dropdown-menu">
              <li><a v-for="album in userAlbums" class="dropdown-item" @click="addVideoToAlbum(album)">{{album.title}}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div style="width: 100%; display: flex; flex-wrap: wrap">
        <div style="width: 50%; display: flex; flex-wrap: wrap; gap: 5px; text-wrap: normal; word-break: break-word">
          <p style="color: white">Description: </p>
          <p style="color: white; text-wrap: avoid">
            {{video.description}}
          </p>
        </div>
        <div style="width: 50%; display: flex; flex-wrap: wrap; gap: 5px">
          <p style="color: white">Video author: </p>
          <p v-if="video.author" style="color: white;">
            {{this.video.author.username}}
          </p>
          <div v-if="this.user_video" style="width: 100%; display: flex; flex-wrap: wrap; gap: 5px">
            <p style="color: white">Want to delete video: </p>
            <button @click="videoDelete()" style="width: fit-content; align-items: center; background-color: transparent; color: white; height: fit-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  data() {
    return {
      video: [],
      userAlbums: [],
      form: {
        video_id: null,
        album_id: null,
      },
      user: null,
      user_video: false,
    }
  },
  mounted() {
    this.axios.get(`/video/${this.$route.params.id}`).then(response => {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.video = response.data.data
      if (this.video.author.id === this.user.id) {
        this.user_video = true
      }
      console.log(this.user_video)
    });
    this.axios.get('/userAlbums').then(response => {
      this.userAlbums = response.data.data
    })
  },
  methods: {
    async addVideoToAlbum(album) {
      this.form = {
        video_id: this.$route.params.id,
        album_id: album.id,
      }
      this.axios.post('/addVideoToAlbum',this.form).then(response => {
        console.log(response.data);
      })
    },
    async videoDelete() {
      this.axios.delete(`/video/${this.$route.params.id}`).then(response => {
        console.log(response.data)
        router.push('/')
      })
    }
  },
}
</script>
<style>
</style>
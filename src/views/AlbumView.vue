<template>
  <div class="container">
    <div style="display: flex; justify-content: center; width: 100%; gap: 20px">
     <p v-if="album" style="font-size: 20px; font-weight: bold; color: white">{{album.title}}</p>
      <button @click="albumDelete()" style="width: fit-content; align-items: center; background-color: transparent; color: white; height: fit-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </button>
    </div>
    <div style="display: flex; justify-content: start; width: 100%; flex-wrap: wrap; gap: 20px">
      <p v-if="!this.videos.length" style="color: white">There no video yet</p>
      <videoCard
          v-if="this.videos.length > 0"
          v-for="(video, index) in album.videos"
          :key="index"
          :video="video"
      />
    </div>
  </div>
</template>
<script>
import videoCard from "@/components/videoCard";
import router from "@/router";
export default {
  components: {videoCard},
  data() {
    return {
      album: null,
      videos: [],
    }
  },
  mounted() {
    this.axios.get(`/album/${this.$route.params.id}`).then(response => {
      this.album = response.data.data
      this.videos = response.data.data.videos
      console.log(response.data.data)
    })
  },
  methods: {
    async albumDelete() {
      this.axios.delete(`/album/${this.$route.params.id}`).then(response => {
        console.log(response.data)
        router.push('/albums')
      })
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
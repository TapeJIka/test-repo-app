<template>
  <div class="container">
    <videoCard
        v-if="this.videos.length > 0"
        v-for="(video, index) in videos"
        :key="index"
        :video="video"
    />
  </div>
</template>
<script>
import videoCard from "@/components/videoCard";
export default {
  components: {videoCard},
  data() {
    return {
        videos: [],
    }
  },
  mounted() {
    this.axios.get('/video').then(response => {
      this.videos = response.data.data
      console.log(response.data.data)
    })
  },
  methods: {
  },
}
</script>
<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
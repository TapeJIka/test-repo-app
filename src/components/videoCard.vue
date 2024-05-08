<template>
  <button @click="getVideo()" style="background-color: transparent;">
    <div class="card" style="width: 180px; background-color: transparent; color: white;">
      <video v-if="this.video.file.length > 0" title="Bruce Lee meets Jackie Chan" :src="`${this.video.file}`" type="video/mp4"></video>
      <div class="card-body">
        <p class="card-title">{{this.video.title}}</p>
        <div class="card-text" style="display: flex; flex-direction: column; gap: 3px">
          <small class="text-body-secondary" style="color: lightgray!important;">{{this.video.author.username}}</small>
        </div>
      </div>
    </div>
  </button>
</template>
<script>
import router from "@/router";

export default {
  props: {
    video: {
      type: Object,
      default: null,
    }
  },
  methods: {
    getVideo () {
      router.push(`/video/${this.video.id}`)
    }
  },
}
</script>
<style>
.card-title {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 12px;
}
</style>
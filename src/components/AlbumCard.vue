<template>
  <button @click="getVideo()" style="background-color: transparent; border-radius: 10px">
    <div class="card" style="width: fit-content; max-width: 100px; background-color: transparent; color: white; text-wrap: normal; word-break: break-word">
      <div class="card-body">
        <p class="card-title">{{this.album.title}}</p>
      </div>
    </div>
  </button>
</template>
<script>
import router from "@/router";

export default {
  props: {
    album: {
      type: Object,
      default: null,
    }
  },
  methods: {
    getVideo () {
      router.push(`/album/${this.album.id}`)
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
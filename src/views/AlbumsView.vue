<template>
  <div style="display: flex; justify-content: center; vertical-align: center; align-items: center; width: 100%; gap: 20px">
    <p style="color: white">Create a new album > </p>
    <button @click="albumCreateView()" style="background-color: transparent; color: white; border-radius: 10px">Create</button>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 10px; width: 100%; margin-top: 20px">
    <AlbumCard
        v-if="this.albums.length > 0"
        v-for="(album, index) in albums"
        :key="index"
        :album="album"
    />
  </div>
</template>
<script>
import AlbumCard from "@/components/AlbumCard";
import router from "@/router";
export default {
  components: {AlbumCard},
  data() {
    return {
      albums: [],
    }
  },
  mounted() {
    this.axios.get('/userAlbums').then(response => {
      this.albums = response.data.data
    })
  },
  methods: {
    albumCreateView () {
      router.push('/albumCreate')
    }
  },
}
</script>
<style>
</style>
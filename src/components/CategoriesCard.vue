<template>
  <div class="card" style="width: fit-content; max-width: 100px; background-color: transparent; color: white; text-wrap: normal; word-break: break-word">
    <div class="card-body">
      <p class="card-title">{{this.category.title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    category: {
      type: Object,
      default: null,
    }
  }
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
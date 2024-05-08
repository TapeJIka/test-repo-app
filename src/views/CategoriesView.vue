<template>
  <div style="display: flex;justify-content: center; flex-wrap: wrap; gap: 20px">
    <div v-if="this.userCategories.length > 0" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; width: 100%">
      <div style="display: flex; justify-content: center; width: 100%"></div>
      <p style="font-size: 18px; font-weight: bold;  color: white">Your most liked categories :</p>
      <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; width: 100%">
        <CategoriesCard
            v-if="this.userCategories.length > 0"
            v-for="(category, index) in userCategories"
            :key="index"
            :category="category"
        />
      </div>
    </div>
    <p style="font-size:20px; color: white">All categories :</p>
    <CategoriesCard
    v-if="this.categories.length > 0"
    v-for="(category, index) in categories"
    :key="index"
    :category="category"
    />
  </div>
</template>
<script>
import CategoriesCard from "@/components/CategoriesCard";

export default {
  components: {CategoriesCard},
  data() {
    return {
      categories: [],
      userCategories: [],
    }
  },
  mounted() {
    this.axios.get('category').then(response => {
      this.categories = response.data.data
    })
    this.axios.get('userCategories').then(response => {
      this.userCategories = response.data.data
    })
  }
}
</script>
<style>
</style>
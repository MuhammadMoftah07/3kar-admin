<template>
  <div>
    <ThemeTitle text="الرئيسية" />

    <LazyThemeCommingSoon />

    <section
      class="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3 xl:grid-cols-4"
    ></section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "authenticated",
});
// Use the route parameter to fetch the correct user data
// Fetch user data using $fetch
</script>

<style scoped>
.info-style {
  @apply relative p-4 rounded-lg bg-gradient-to-tl from-theme1 to-theme3 hover:saturate-200 cursor-pointer;
}
</style>

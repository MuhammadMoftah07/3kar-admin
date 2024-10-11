<template>
  <div>
    <ThemeTitle text="الملف الشخصي" />
    <ThemeCommingSoon class="mt-16" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "authenticated",
});
</script>

<style></style>

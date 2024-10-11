<template>
  <main>
    <div class="text-xl font-semibold text-slate-600">Components page</div>

    <section>
      <h3 class="title">Modal</h3>

      <!-- <LayoutModal /> -->
    </section>

    <div class="p-10 bg-slate-500 text-slate-50 rounded-xl">
      الزراير

      <section class="grid gap-3">
        <button class="btn">Button</button>
        <button class="btn btn-neutral">Neutral</button>
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-accent">Accent</button>
        <button class="btn btn-ghost">Ghost</button>
        <button class="btn btn-link">Link</button>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup></script>

<style scoped>
.title {
  @apply text-xl text-slate-600 font-semibold my-6 pt-6 border-t-2;
}
</style>

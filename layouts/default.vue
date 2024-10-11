<template>
  <main>
    <LayoutMainHeader />
    <section class="flex">
      <LayoutSidebar
        class="hidden md:flex duration-150 h-[calc(100vh-60px)]"
        :class="sideCollapsed ? 'w-[60px]' : 'w-[200px] '"
      />
      <div
        :class="
          sideCollapsed ? 'md:w-[calc(100%-60px)]' : 'md:w-[calc(100%-200px)]'
        "
        class="w-full bg-slate-50 h-[calc(100vh-60px)] overflow-y-auto p-4"
      >
        <slot />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
const sideCollapsed = computed(() => useGlobalStore().sideCollapsed);
onBeforeMount(() => {});
</script>

<style></style>

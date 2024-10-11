<template>
  <section
    v-if="meta && meta.last_page > 1"
    class="flex items-center justify-center gap-2"
    v-auto-animate="{ duration: 400 }"
  >
    <a
      :class="{ disable: meta.current_page === 1 || !meta.current_page }"
      @click="$emit('current', meta.current_page - 1)"
      class="pag-btn"
    >
      <IconsRightChevronIcon class="w-4 h-4" />
    </a>

    <a
      v-if="meta.current_page"
      :class="{
        '!bg-theme2 !text-white pointer-events-none': meta.current_page === 1,
        'bg-white ': meta.current_page !== 1,
      }"
      @click="$emit('current', 1)"
      class="pag-btn"
    >
      1
    </a>

    <a
      v-if="meta.current_page >= 5"
      class="flex items-center justify-center w-10 h-10 rounded-[10px] text-sm theme-shadow"
    >
      <span class="relative top-[-3px]">.....</span>
    </a>

    <a
      v-for="n in paginations"
      :key="n"
      :class="{
        '!bg-theme2 !text-white pointer-events-none': meta.current_page === n,
        'bg-white ': meta.current_page !== n,
      }"
      @click="$emit('current', n)"
      class="pag-btn"
    >
      {{ n }}
    </a>

    <a
      v-if="
        meta.current_page !== meta.last_page &&
        meta.current_page < meta.last_page - 2 &&
        meta.last_page > 5
      "
      class="flex items-center justify-center w-10 h-10 rounded-[10px] text-sm theme-shadow"
    >
      <span class="relative top-[-3px]">.....</span>
    </a>

    <a
      v-if="meta.last_page !== 1 && meta.last_page"
      :class="{
        '!bg-theme2 !text-white pointer-events-none':
          meta.current_page === meta.last_page,
        'bg-white ': meta.current_page !== meta.last_page,
      }"
      @click="$emit('current', meta.last_page)"
      class="pag-btn"
    >
      {{ meta.last_page }}
    </a>

    <a
      :class="{ disable: meta.current_page === meta.last_page }"
      @click="$emit('current', meta.current_page + 1)"
      class="pag-btn"
    >
      <IconsLeftChevronIcon class="w-4 h-4" />
    </a>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  meta: Object,
});

// const paginations = ref([]);
const paginations = computed(() => {
  const meta = props.meta;
  if (!meta) return;

  const lastPage = meta.last_page;
  const currentPage = meta.current_page;

  const newPag = [];
  if (lastPage <= 5) {
    for (let i = 2; i < lastPage; i++) {
      newPag.push(i);
    }
  } else {
    if (currentPage < 5) {
      for (let i = 2; i < lastPage; i++) {
        if (i === 6) break;
        newPag.push(i);
      }
    } else if (currentPage >= 5 && currentPage < lastPage - 1) {
      newPag.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1
      );
    } else if (currentPage === lastPage) {
      newPag.push(
        currentPage - 4,
        currentPage - 3,
        currentPage - 2,
        currentPage - 1
      );
    } else {
      newPag.push(
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage
      );
    }
  }

  return (paginations.value = newPag);
});
</script>

<style scoped>
.disable {
  @apply pointer-events-none opacity-40;
}
.pag-btn {
  @apply w-9 h-9 border-slate-200 font-bold cursor-pointer min-h-0 text-xs p-0 bg-white duration-300 btn hover:bg-theme2 hover:text-white text-slate-700;
}
</style>

<template>
  <main class="">
    <ThemeTitle class="mb-6" text="تقارير الشيوخ" />

    <ThemeTable
      :headers="headers"
      :items="data"
      :meta="meta"
      :loading="useReportsStore().loading"
      @current="paginationHandler"
    >
      <template #session_details="item">
        {{ item.session_details?.length }}
      </template>
      <template #teacher_courses="item">
        <aside class="flex flex-wrap gap-1">
          <span
            v-for="el in item.teacher_courses"
            :el="el.id"
            class="px-2 py-1 text-xs rounded bg-slate-800 text-slate-50"
          >
            {{ el.title }}
          </span>
        </aside>
      </template>

      <template #teacher_committees="item">
        <aside class="flex flex-wrap gap-1">
          <span
            v-for="el in item.teacher_committees"
            :el="el.id"
            class="px-2 py-1 text-xs rounded bg-slate-800 text-slate-50"
          >
            {{ el.title }}
          </span>
        </aside>
      </template>
    </ThemeTable>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "authenticated",
});
// const value = ref("test");
const $t = useI18n().t;
const loading = ref(true);
await useReportsStore().fetchData();
loading.value = false;
const data = computed(() => useReportsStore().data);
const meta = computed(() => useReportsStore().meta);
function paginationHandler($event) {
  useRouter()
    .push({
      path: useRoute().path, // Keep the current path
      query: {
        ...useRoute().query, // Copy existing query parameters
        page: $event, // Update the page query
      },
    })
    .then(() => {
      useReportsStore().fetchData();
    });
}

const headers = computed(() => {
  return [
    { text: $t("ID"), value: "id" },
    { text: $t("name"), value: "name" },
    // { text: "ID", value: "id", width: 100 },
    { text: $t("rewaya"), value: "rewaya.title" },
    // { text: $t("description"), value: "desc" },
    { text: $t("qualification"), value: "qualification" },
    { text: "اللجان", value: "teacher_committees" },
    { text: "الكورسات", value: "teacher_courses" },
  ];
});

// search keyword section
const searchFilter = ref("");
function getFilterdData() {
  useRouter()
    .replace({
      path: useRoute().path, // Keep the current path
      query: {
        ...useRoute().query, // Copy existing query parameters
        filter: searchFilter.value, // Update the page query
      },
    })
    .then(() => {
      useReportsStore().fetchData();
    });
}
const submitWithFilter = useDebounceFunc(getFilterdData, 1200);
async function activeHandler(id: number, value: any) {
  useReportsStore().loading = true;
  await $http(`/admin/course/activation/${id}?active=${value}`);
  useReportsStore().loading = false;
  useReportsStore().fetchData();
  useToast().showSuccess();
}
</script>

<style></style>

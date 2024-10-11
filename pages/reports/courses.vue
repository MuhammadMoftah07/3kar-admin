<template>
  <main class="">
    <ThemeTitle class="mb-6" text="تقارير الكورسات" />

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
    { text: $t("title"), value: "title" },
    // { text: "ID", value: "id", width: 100 },
    { text: $t("rewaya"), value: "rewaya.title" },
    { text: $t("sheikh"), value: "teacher.name" },
    { text: $t("description"), value: "desc" },
    // { text: $t("status"), value: "status" },
    { text: " الطلاب الحاضرين", value: "student_count" },
    { text: "عدد الحصص", value: "session_details" },
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

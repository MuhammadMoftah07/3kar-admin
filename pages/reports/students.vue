<template>
  <main class="">
    <ThemeTitle class="mb-6" text="تقارير الطلاب" />

    <ThemeTable
      :headers="headers"
      :items="data"
      :meta="meta"
      :loading="useReportsStore().loading"
      @current="paginationHandler"
    >
      <template #status="item"> {{ item.status }} </template>
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
await useReportsStore().fetchStudents();
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
      useReportsStore().fetchStudents();
    });
}

const headers = computed(() => {
  return [
    { text: $t("ID"), value: "student_id" },
    { text: $t("name"), value: "name" },
    // { text: "ID", value: "id", width: 100 },
    { text: $t("nationality"), value: "nationality" },
    { text: $t("phone"), value: "phone" },
    { text: $t("total_surahs"), value: "total_surahs" },
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
      useReportsStore().fetchStudents();
    });
}
const submitWithFilter = useDebounceFunc(getFilterdData, 1200);
async function activeHandler(id: number, value: any) {
  useReportsStore().loading = true;
  await $http(`/admin/course/activation/${id}?active=${value}`);
  useReportsStore().loading = false;
  useReportsStore().fetchStudents();
  useToast().showSuccess();
}
</script>

<style></style>

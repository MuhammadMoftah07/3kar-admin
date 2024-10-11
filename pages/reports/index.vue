<template>
  <main class="">
    <ThemeTitle class="mb-6" text="التقارير" />

    <ThemeTable
      :headers="headers"
      :items="data"
      :meta="meta"
      :loading="useReportsStore().loading"
      @current="paginationHandler"
    >
      <template #status="item"> {{ item.status }} </template>

      <template #active="item">
        <aside class="flex gap-2">
          <input
            @click="activeHandler(item.id, item.active == 1 ? 0 : 1)"
            type="checkbox"
            class="toggle toggle-success tooltip"
            :data-tip="item.active == 1 ? 'الغاء التنشيط' : 'قم بالتنشيط'"
            :checked="item.active == 1 ? 1 : 0"
          />
        </aside>
      </template>

      <template #actions="item">
        <div class="flex items-center gap-2">
          <button
            @click="
              (useGlobalStore().activeItem = item),
                ($modal.value = 'CreateCourse')
            "
            type="button"
            class="action-btn"
          >
            <IconsEditIcon2 class="w-5 h-[18px]" />
          </button>

          <!-- <button type="button" class="del-btn">
            <IconsDeleteIcon class="w-5 h-[18px]" />
          </button> -->
        </div>
      </template>
    </ThemeTable>

    <CourseCreate v-if="$modal.value == 'CreateCourse'" />
    <ThemePlusButton
      @click.native="
        (useGlobalStore().activeItem = null), ($modal.value = 'CreateCourse')
      "
    />
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
    { text: $t("activation"), value: "active" },
    { text: $t("actions"), value: "actions" },
    // { text: "عدد الطلاب", value: "student_count" },
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

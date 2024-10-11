<template>
  <main class="">
    <ThemeTitle class="mb-6" text="المدن" />

    <ThemeTable
      :headers="headers"
      :items="data"
      :meta="meta"
      :loading="useCitiesStore().loading"
      @current="paginationHandler"
    >
      <template #status="item">
        <span
          class="px-3 py-0 text-xs rounded-md"
          :class="
            item.status == '0'
              ? 'text-red-100 bg-red-600'
              : 'text-green-100 bg-green-600'
          "
        >
          {{ item.status == "0" ? "غير مفعل" : "مفعل" }}
        </span>
      </template>

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
                ($modal.value = 'CreateItem')
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

    <CitiesCreate v-if="$modal.value == 'CreateItem'" />
    <ThemePlusButton
      @click.native="
        (useGlobalStore().activeItem = null), ($modal.value = 'CreateItem')
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
await useCitiesStore().fetchData();
loading.value = false;
const data = computed(() => useCitiesStore().data);
const meta = computed(() => useCitiesStore().meta);
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
      useCitiesStore().fetchData();
    });
}

const headers = computed(() => {
  return [
    { text: "ID", value: "id" },
    { text: $t("name"), value: "name" },
    // { text: $t("status"), value: "status" },
    { text: $t("actions"), value: "actions" },
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
      useCitiesStore().fetchData();
    });
}
const submitWithFilter = useDebounceFunc(getFilterdData, 1200);
async function activeHandler(id: number, value: any) {
  useCitiesStore().loading = true;
  await $http(`/admin/course/activation/${id}?active=${value}`);
  useCitiesStore().loading = false;
  useCitiesStore().fetchData();
  useToast().showSuccess();
}
</script>

<style></style>

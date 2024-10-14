<template>
  <main class="">
    <ThemeTitle class="mb-6" text="تفاصيل الوحدة" />

    <ThemeTable
      :headers="headers"
      :items="data"
      :meta="meta"
      :loading="useUnitDetailsStore().loading"
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

    <UnitDetailsCreate v-if="$modal.value == 'CreateItem'" />
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

await useUnitDetailsStore().fetchData();
loading.value = false;
const data = computed(() => useUnitDetailsStore().data);
const meta = computed(() => useUnitDetailsStore().meta);

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
      useUnitDetailsStore().fetchData();
    });
}

const headers = computed(() => {
  return [
    { text: "ID", value: "id" },
    { text: $t("name"), value: "feature_name" },
    { text: $t("status"), value: "status" },
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
      useUnitDetailsStore().fetchData();
    });
}
const submitWithFilter = useDebounceFunc(getFilterdData, 1200);
async function activeHandler(id: number, value: any) {
  useUnitDetailsStore().loading = true;
  await $http(`/admin/course/activation/${id}?active=${value}`);
  useUnitDetailsStore().loading = false;
  useUnitDetailsStore().fetchData();
  useToast().showSuccess();
}
</script>

<style></style>

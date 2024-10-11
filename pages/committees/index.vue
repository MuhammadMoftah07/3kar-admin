<template>
  <main class="">
    <ThemeTitle class="mb-6" text="اللجان" />

    <ThemeTable
      :headers="headers"
      :items="data"
      :meta="meta"
      :loading="useCitiesStore().loading"
      @current="paginationHandler"
    >
      <template #status="item"> {{ item.status }} </template>
      <template #sheikh="item">
        <aside class="flex items-center gap-1" v-if="item.teacher">
          <span
            class="p-1 text-xs text-green-100 rounded-md w-fit bg-theme2"
            v-for="el in item.teacher"
          >
            {{ el.name }}
          </span>
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

    <CommitteeCreate v-if="$modal.value == 'CreateItem'" />
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
await useCommitteeStore().fetchData();
loading.value = false;
const data = computed(() => useCommitteeStore().data);
const meta = computed(() => useCommitteeStore().meta);
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
      useCommitteeStore().fetchData();
    });
}

const headers = computed(() => {
  return [
    { text: $t("ID"), value: "id" },
    { text: $t("title"), value: "title" },
    { text: $t("description"), value: "desc" },
    { text: $t("sheikh"), value: "sheikh" },
    { text: $t("actions"), value: "actions" },
    // { text: "عدد الطلاب", value: "student_count" },
  ];
});
</script>

<style></style>

<template>
  <main class="">
    <ThemeTitle class="mb-6" text="الوحدات" />
    <ThemeTable
      :items="data"
      :headers="headers"
      :loading="loading"
      :rows-per-page="99"
    >
      <template #status="item"> {{ item.status }} </template>

      <template #actions="item">
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="
              (useGlobalStore().activeItem = item),
                ($modal.value = 'CreateItem')
            "
            class="action-btn tooltip"
            data-tip="تعديل"
          >
            <IconsEditIcon2 class="w-5 h-[18px]" />
          </button>
          <!-- 
          <button type="button" class="del-btn tooltip" data-tip="مسح">
            <IconsDeleteIcon class="w-5 h-[18px]" />
          </button> -->
        </div>
      </template>
    </ThemeTable>

    <RewayaCreate v-if="$modal.value == 'CreateItem'" />
    <ThemePlusButton @click.native="$modal.value = 'CreateItem'" />
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "authenticated",
});

const $t = useI18n().t;
const loading = ref(true);
await useUnitsStore().fetchData();
loading.value = false;
const data = computed(() => useUnitsStore().data);

const headers = computed(() => {
  return [
    { text: $t("ID"), value: "id" },
    { text: $t("name"), value: "unit_name" },
    // { text: "ID", value: "id", width: 100 },
    // { text: $t("status"), value: "status" },
    { text: $t("actions"), value: "actions" },
    // { text: "عدد الطلاب", value: "student_count" },
  ];
});
</script>

<style></style>

<template>
  <main class="">
    <ThemeTitle class="mb-6" text=" الشيوخ" />

    <section class="grid grid-cols-6 mb-1">
      <ThemeInput
        class="max-w-xs"
        title="الاسم او تلفون"
        type="text"
        @input="submitWithFilter()"
        v-model="searchFilter"
      />
    </section>

    <ThemeTable
      :headers="headers"
      :items="data"
      :meta="meta"
      :loading="useSheikhStore().loading"
      @current="paginationHandler"
    >
      <template #phone="item">
        <section>
          <!-- whats app mobile  -->
          <a
            v-if="platform == 'iPhone' || platform == 'Android'"
            :href="`whatsapp://send?phone=${item.phone}`"
            class="flex gap-[2px] text-xs font-bold text-slate-600 hover:underline hover:text-theme2"
          >
            <IconsWhatsappIcon class="w-5 h-5" /> {{ item.phone }}
          </a>

          <!-- whats app web  -->
          <a
            v-else
            :href="`https://web.whatsapp.com/send?phone=${item.phone}&text=`"
            target="_blank"
            class="flex gap-[2px] text-xs font-bold text-slate-600 hover:underline hover:text-theme2"
          >
            <IconsWhatsappIcon class="w-4 h-4" /> {{ item.phone }}
          </a>
        </section>
      </template>

      <template #verify="item">
        <span
          class="grid px-2 py-1 text-xs rounded-[4px] w-fit bg-emerald-500 place-content-center text-emerald-50"
          v-if="item.verify == 1"
        >
          نعم
        </span>
        <span
          v-if="item.verify == 0"
          class="grid px-2 py-1 text-xs bg-red-500 rounded-[4px] w-fit place-content-center text-red-50"
        >
          لا</span
        >
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
            type="button"
            class="action-btn tooltip"
            data-tip="التفاصيل"
            @click="useRouter().push(`/users/${item.id}`)"
          >
            <IconsEyesIcon class="w-5 h-[18px]" />
          </button>

          <button
            type="button"
            class="action-btn tooltip"
            data-tip="التقرير"
            @click="useRouter().push(`/sheikh/${item.id}/report`)"
          >
            <IconsReportIcon class="w-5 h-[18px]" />
          </button>

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

    <SheikhCreate v-if="$modal.value == 'CreateItem'" />
    <ThemePlusButton
      @click.native="
        (useGlobalStore().activeItem = { role: 2 }),
          ($modal.value = 'CreateItem')
      "
    />
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "authenticated",
});

const $t = useI18n().t;
const loading = ref(true);
await useSheikhStore().fetchData();
loading.value = false;
const data = computed(() => useSheikhStore().data);
const meta = computed(() => useSheikhStore().meta);
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
      useStudentStore().fetchData();
    });
}

const headers = computed(() => {
  return [
    { text: $t("ID"), value: "id" },
    { text: $t("name"), value: "name" },
    { text: $t("phone"), value: "phone" },
    { text: $t("gender"), value: "gender" },
    { text: $t("qualification"), value: "qualification" },
    { text: $t("job"), value: "job" },
    { text: $t("nationality"), value: "nationality" },
    { text: $t("verified"), value: "verify" },
    { text: $t("activation"), value: "active" },

    // { text: "ID", value: "id", width: 100 },
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
      useSheikhStore().fetchData();
    });
}
const submitWithFilter = useDebounceFunc(getFilterdData, 1200);

async function activeHandler(id: number, value: any) {
  useSheikhStore().loading = true;

  await $http(`/admin/users/activation/${id}?active=${value}`);
  useSheikhStore().loading = false;
  useSheikhStore().fetchData();
  useToast().showSuccess();
}
</script>

<style></style>

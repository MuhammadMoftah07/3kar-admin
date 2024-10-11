<template>
  <LayoutModal>
    <template #modal-title> تحديد موعد الاختبار المبدئي</template>

    <template #modal-body>
      <section class="grid gap-2">
        <p class="py-5 text-sm font-semibold text-slate-600">
          انت الان علي وشك ارسال موعد الاختبار المبدئي الي
          <span class="font-bold text-theme2"> {{ activeData.name }}</span>
        </p>

        <div class="grid grid-cols-2 gap-2">
          <input type="date" class="cursor-pointer input" v-model="date" />
          <input type="time" class="cursor-pointer input" v-model="time" />

          <ThemeSelect
            title="اللجنة"
            url="/admin/committees"
            v-model="user"
            label="title"
          />
        </div>
      </section>
    </template>

    <template #modal-footer>
      <footer class="gap-2 modal-action">
        <!-- :disabled="!title || loading" -->
        <button class="btn h-9 btn-theme" @click="submit()">
          <span v-if="loading" class="loading loading-spinner"></span>
          إتمام
        </button>
        <button
          @click="$modal.value = ''"
          class="font-medium btn h-9 btn-ghost text-slate-700"
        >
          اغلاق
        </button>
      </footer>
    </template>
  </LayoutModal>
</template>

<script lang="ts" setup>
const props = defineProps(["activeData"]);
const date = ref("");
const user = ref({});
const time = ref("");
const dateTime = computed(() => date.value + " " + time.value);
const loading = ref(false);

const submit = () => {
  loading.value = true;
  $http("/admin/general-test", {
    method: "post",
    body: {
      user_id: props.activeData.id,
      date: dateTime.value,
      committee_id: user.value?.id,
    },
  })
    .then(() => {
      loading.value = false;
      useStudentStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};
</script>
<style scoped>
:deep(.modal-box) {
  overflow: visible;
}
</style>

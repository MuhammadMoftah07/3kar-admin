<template>
  <LayoutModal>
    <template #modal-title> تحديد نتيجة الاختبار المبدئي</template>

    <template #modal-body>
      <section class="grid gap-2">
        <p class="py-4 text-sm font-semibold text-slate-600">
          انت الان علي وشك تحديد نتيجة الاختبار المبدئي لـــ
          <span class="font-bold text-theme2"> {{ activeData.name }}</span>
        </p>

        <div class="flex gap-4">
          <label>
            <input
              type="radio"
              value="2"
              v-model="selectedValue"
              class="sr-only"
            />
            <span
              :class="[
                'btn items-center h-10 w-44 font-bold rounded-md cursor-pointer hover:bg-green-400',
                selectedValue === '2'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-100 text-slate-500',
              ]"
            >
              ناجح
            </span>
          </label>
          <label>
            <input
              type="radio"
              value="1"
              v-model="selectedValue"
              class="sr-only"
            />
            <span
              :class="[
                'btn items-center h-10 w-44 font-bold rounded-md cursor-pointer hover:bg-red-400',
                selectedValue === '1'
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-100 text-slate-500',
              ]"
            >
              راسب
            </span>
          </label>
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
const selectedValue = ref("");
const loading = ref(false);

const submit = () => {
  loading.value = true;
  $http("/admin/general-test-approve", {
    method: "post",
    body: {
      user_id: props.activeData.id,
      status_id: selectedValue.value,
    },
  })
    .then(() => {
      useStudentStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      useToast().errorHandler(err);
    });
};
</script>
<style scoped>
:deep(.modal-box) {
  overflow: visible;
}
</style>

<template>
  <LayoutModal modal-classes="max-w-2xl">
    <template #modal-title>
      <span v-if="activeItem?.id"> تعديل </span>
      <span v-else> انشاء </span>
      تفاصيل وحدة
    </template>

    <template #modal-body>
      <section class="grid grid-cols-2 gap-2">
        <ThemeInput title="الاسم" v-model="form.feature_name" />

        <ThemeInput
          title="الحالة"
          type="select"
          :options="statusArray"
          selectLabel="name"
          selectValue="value"
          v-model="form.status"
        />
      </section>
    </template>

    <template #modal-footer>
      <footer class="gap-2 modal-action">
        <button
          class="btn h-9 btn-theme"
          :disabled="loading"
          @click="activeItem ? edit() : submit()"
        >
          <span v-if="loading" class="loading loading-spinner"></span>
          إتمام
        </button>
        <button
          @click="$modal.value = false"
          class="font-medium btn h-9 btn-ghost text-slate-700"
        >
          اغلاق
        </button>
      </footer>
    </template>
  </LayoutModal>
</template>

<script lang="ts" setup>
const statusArray = [
  { name: "مفعل", value: "1" },
  { name: "غير مفعل", value: "0" },
];

let form = reactive({});
const loading = ref(false);

const activeItem = useGlobalStore().activeItem;

// init component
if (activeItem?.id) {
  form.feature_name = activeItem.feature_name;
  form.status = activeItem.status;
}
const submit = () => {
  // for (let i in sessions_details) {
  //   payload[`sessions_details[${i}][day]`] = sessions_details[i].day;
  //   payload[`sessions_details[${i}][start_time]`] =
  //     sessions_details[i]["start_time"];
  //   payload[`sessions_details[${i}][duration_per_student]`] =
  //     sessions_details[i]["duration_per_student"];
  // }
  let payload = { ...form };
  payload = useObjToFormData(payload);
  loading.value = true;
  $http("/admin/unit-details", {
    method: "post",
    body: payload,
  })
    .then(() => {
      useUnitDetailsStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};

const edit = () => {
  let payload = { ...form };
  payload = useObjToFormData(payload);
  loading.value = true;
  $http(`/admin/unit-details/${activeItem.id}`, {
    method: "post",
    body: payload,
  })
    .then(() => {
      useUnitDetailsStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};
</script>

<template>
  <LayoutModal modal-classes="max-w-2xl">
    <template #modal-title>
      <span v-if="activeItem?.id"> تعديل </span>
      <span v-else> انشاء </span>
      مدينة
    </template>

    <template #modal-body>
      <section class="grid grid-cols-2 gap-2">
        <ThemeInput title="الاسم" v-model="form.name" />
        <ThemeInput title="الحالة" type="textarea" v-model="form.status" />

        <fieldset
          v-if="false"
          class="relative grid col-span-2 gap-2 p-2 border-2 rounded"
          v-auto-animate
        >
          <legend class="input-title">تفاصيل المدينة :</legend>
          <button
            data-tip="اضافة حلقة"
            class="absolute p-0 tooltip -top-7 end-5 btn btn-sm btn-theme"
            @click="sessions_details.push({})"
          >
            <IconsPlusIcon class="h-6" />
          </button>

          <aside
            class="flex gap-x-2 gap-y-10"
            v-for="(el, i) in sessions_details"
          >
            <ThemeInput
              title="اليوم"
              type="select"
              :options="days"
              selectLabel="name"
              selectValue="id"
              v-model="sessions_details[i]['day']"
            />
            <ThemeInput
              type="time"
              v-model="sessions_details[i]['start_time']"
              title="الوقت"
            />

            <ThemeNumber
              title="الدقائق لكل طالب"
              v-model="sessions_details[i]['duration_per_student']"
            />

            <button
              class="self-end mb-3 del-btn"
              @click="sessions_details.splice(i, 1)"
            >
              <IconsDeleteIcon class="h-4" />
            </button>
          </aside>
        </fieldset>
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
let form = reactive({});
const loading = ref(false);
const days = useGlobalData().days;
let city = ref({});
let user = ref({});
let sessions_details = reactive([{}]);
const activeItem = useGlobalStore().activeItem;

// init component
if (activeItem?.id) {
  form.name = activeItem.name;
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
  $http("/admin/cities", {
    method: "post",
    body: payload,
  })
    .then(() => {
      useCitiesStore().fetchData();
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
  $http(`/admin/cities/${activeItem.id}`, {
    method: "post",
    body: payload,
  })
    .then(() => {
      useCitiesStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};
</script>

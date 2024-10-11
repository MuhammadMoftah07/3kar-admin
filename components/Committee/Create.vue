<template>
  <LayoutModal modal-classes="max-w-2xl">
    <template #modal-title>
      <span v-if="activeItem?.id"> تعديل </span>
      <span v-else> انشاء </span>
      لجنة <span v-if="activeItem?.id">#{{ activeItem.id }}</span>
    </template>

    <template #modal-body>
      <section class="grid grid-cols-2 gap-2">
        <ThemeInput title="العنوان" v-model="form.title" />
        <ThemeInput title="الوصف" type="textarea" v-model="form.desc" />

        <ThemeSelect
          class="col-span-2"
          title="اختر الاستاذ"
          url="/admin/users"
          params="role_id=2"
          :multiple="true"
          v-model="users"
        />
      </section>
    </template>

    <template #modal-footer>
      <footer class="gap-2 modal-action">
        <button
          class="btn h-9 btn-theme"
          :disabled="loading"
          @click="initDataDeforeSubmit()"
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
let users = ref([]);
const loading = ref(false);

const activeItem = useGlobalStore().activeItem;

// init component
if (activeItem?.id) {
  form.title = activeItem.title;
  form.desc = activeItem.desc;
  users.value = activeItem.teacher;
}

const initDataDeforeSubmit = () => {
  let payload = { ...form };
  payload.teacher_ids = users.value.map((el) => el.id);
  payload = useObjToFormData(payload);

  if (activeItem?.id) {
    edit(payload);
    return;
  }
  submit(payload);
};
const submit = (payload) => {
  loading.value = true;
  $http("/admin/committee", {
    method: "post",
    body: payload,
  })
    .then(() => {
      useCommitteeStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};

const edit = (payload) => {
  loading.value = true;
  $http(`/admin/committee-update/${activeItem.id}`, {
    method: "post",
    body: payload,
  })
    .then(() => {
      useCommitteeStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};
</script>

<template>
  <LayoutModal>
    <template #modal-title>
      <span v-if="activeItem?.id"> تعديل </span>
      <span v-else> اضافة </span>
      روايا
    </template>
    <template #modal-body>
      <section class="grid gap-2">
        <ThemeInput title="عنوان الرواية" v-model="title" />
      </section>
    </template>

    <template #modal-footer>
      <footer class="gap-2 modal-action">
        <button
          class="btn h-9 btn-theme"
          :disabled="!title || loading"
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
const title = ref("");
const loading = ref(false);
const activeItem = useGlobalStore().activeItem;

// init component
if (activeItem?.id) {
  title.value = activeItem.title;
}

const submit = () => {
  loading.value = true;
  $http("/rewaya", {
    method: "post",
    body: {
      title: title.value,
    },
  })
    .then(() => {
      useUnitsStore().fetchData();
      useToast().showSuccess();
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      useToast().errorHandler(err);
    });
};

const edit = () => {
  loading.value = true;
  $http(`/rewaya-update/${activeItem.id}`, {
    method: "post",
    body: {
      title: title.value,
    },
  })
    .then(() => {
      useUnitsStore().fetchData();
      useToast().showSuccess();
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      useToast().errorHandler(err);
    });
};
</script>

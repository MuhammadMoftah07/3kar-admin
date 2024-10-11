<template>
  <LayoutModal modal-classes="max-w-2xl">
    <template #modal-title>
      <span v-if="activeItem?.id"> تعديل </span>
      <span v-else> اضافة </span>
      <span
        v-if="
          useGlobalStore().activeItem?.role == 1 || activeItem.role?.id == 1
        "
      >
        طالب
      </span>
      <span v-else> شيخ </span>
    </template>

    <template #modal-body>
      <section class="grid grid-cols-2 gap-2">
        <ThemeInput title=" الاسم" v-model="form.name" />
        <ThemeInput
          :class="activeItem.id ? 'opacity-70 pointer-events-none' : ''"
          title="الهاتف"
          v-model="form.phone"
        />
        <ThemeInput title="الوظيفة" v-model="form.job" />
        <ThemeInput
          :class="activeItem.id ? 'opacity-70 pointer-events-none' : ''"
          title="الجنسية"
          v-model="form.nationality"
        />
        <ThemeInput title="المؤهل" v-model="form.qualification" />
        <ThemeInput
          :class="activeItem.id ? 'opacity-70 pointer-events-none' : ''"
          title="النوع"
          type="select"
          :options="[
            { id: 'male', label: 'ذكر' },
            { id: 'female', label: 'انثي' },
          ]"
          selectLabel="label"
          selectValue="id"
          v-model="form.gender"
        />

        <ThemeSelect
          :class="activeItem.id ? 'opacity-70 pointer-events-none' : ''"
          title="اختر الرواية"
          label="title"
          url="/rewaya"
          v-model="rewaya"
          @select="(v) => (form.rewaya_id = v.id)"
        />

        <aside
          class="grid items-center grid-cols-4 col-span-2 gap-1 pt-2 border-t"
          v-if="activeItem.attachments"
        >
          <h5 class="col-span-4 input-title">عرض الملفات :</h5>
          <a
            v-for="el in activeItem.attachments"
            :key="el.id"
            :href="el.attachment"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 p-2 text-sm font-semibold rounded-lg hover:underline text-theme1 bg-theme1/20"
          >
            <IconsFileTypeIcon
              :type="getFileType(el.attachment)"
              class="w-5 h-5"
            />
            {{ el.title || "..." }}
          </a>
        </aside>

        <fieldset
          class="relative col-span-2 p-2 pt-3 mt-3 border-2 rounded"
          v-auto-animate
        >
          <legend class="input-title">قسم الملفات :</legend>
          <button
            data-tip="اضافة"
            class="absolute p-0 tooltip -top-7 end-5 btn btn-sm btn-theme"
            @click="attachments.push({})"
          >
            <IconsPlusIcon class="h-6" />
          </button>

          <aside class="flex gap-1 items-" v-for="(el, i) in attachments">
            <ThemeInput title="العنوان" v-model="el['title']" />
            <ThemeInput
              type="file"
              @change="el['file'] = $event.target.files[0]"
              title="الملف"
            />

            <button
              class="self-end mb-3 del-btn"
              @click="attachments.splice(i, 1)"
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
          @click="activeItem.id ? edit() : submit()"
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
let rewaya = ref({});
let attachments = reactive([{}]);

const activeItem = useGlobalStore().activeItem;

// console.log("activeItem ", toRaw(activeItem));
// init component
if (activeItem?.id) {
  form.name = activeItem.name;
  form.phone = activeItem.phone;

  form.job = activeItem.job;
  form.nationality = activeItem.nationality;
  form.qualification = activeItem.qualification;
  form.gender = activeItem.gender;
  rewaya.value = activeItem.rewaya;
}

const initDataBeforeSend = () => {
  // console.log("form", form);
  for (let i in attachments) {
    const attachment = attachments[i];
    form[`attachment[${i}][file]`] = attachment.file;
    form[`attachment[${i}][title]`] = attachment.title;
  }
};
const submit = () => {
  initDataBeforeSend();
  let payload = { ...form };
  payload.role_id = useGlobalStore().activeItem?.role;
  payload = useObjToFormData(payload);
  loading.value = true;
  $http("/user/register", {
    method: "post",
    body: payload,
  })
    .then(() => {
      useSheikhStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};

const edit = () => {
  initDataBeforeSend();
  let payload = { ...form };
  // payload.role_id = 2;
  payload.id = activeItem.id;
  payload = useObjToFormData(payload);
  loading.value = true;
  $http(`/user/update`, {
    method: "post",
    body: payload,
  })
    .then(() => {
      useStudentStore().fetchData();
      useSheikhStore().fetchData();
      useToast().showSuccess("تمت العملية بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};
</script>

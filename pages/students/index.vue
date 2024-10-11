<template>
  <main>
    <ThemeTitle class="mb-6" text=" الطلاب" />

    <section class="grid grid-cols-6 mb-1">
      <ThemeInput
        class=""
        title="الحالة"
        type="select"
        :options="status.value"
        selectLabel="label"
        selectValue="id"
        v-model="currentStatus"
      />

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
      :loading="useStudentStore().loading"
      @current="paginationHandler"
    >
      <template #verify="item">
        <aside class="flex gap-2">
          <span
            class="grid px-2 py-1 text-xs rounded-[4px] w-8 bg-emerald-500 place-content-center text-emerald-50"
            v-if="item.verify == 1"
          >
            نعم
          </span>
          <span
            v-if="item.verify == 0"
            class="grid px-2 py-1 text-xs bg-red-500 rounded-[4px] w-8 place-content-center text-red-50"
          >
            لا</span
          >
        </aside>
      </template>

      <template #active="item">
        <aside class="flex gap-2">
          <!-- <span
            class="grid px-2 py-1 text-xs rounded-[4px] w-8 bg-emerald-500 place-content-center text-emerald-50"
            v-if="item.active == 1"
          >
            نشط
          </span>
          <span
            v-if="item.active == 0"
            class="grid px-2 py-1 text-xs bg-red-500 rounded-[4px] w-8 place-content-center text-red-50"
          >
            غير نشط
          </span> -->

          <input
            @click="activeHandler(item.id, item.active == 1 ? 0 : 1)"
            type="checkbox"
            class="toggle toggle-success tooltip"
            :data-tip="item.active == 1 ? 'الغاء التنشيط' : 'قم بالتنشيط'"
            :checked="item.active == 1 ? 1 : 0"
          />
        </aside>
      </template>

      <template #course="item">
        {{ item.course_details?.course?.title }}
      </template>
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
      <template #status="item">
        <span
          class="grid px-3 py-1 text-xs font-semibold rounded-[4px] w-fit place-content-center"
          :class="
            item.status.id == 1
              ? 'bg-red-200 text-red-900'
              : item.status.id == 2
              ? 'bg-green-200 text-green-900'
              : item.status.id == 3
              ? 'bg-yellow-200 text-yellow-900'
              : item.status.id == 4
              ? 'bg-indigo-200 text-indigo-900'
              : item.status.id == 5
              ? 'bg-sky-200 text-sky-900'
              : item.status.id == 6
              ? 'bg-cyan-200 text-cyan-900'
              : 'bg-slate-200 text-slate-900'
          "
        >
          {{ item.status.label }}
        </span>
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
            @click="useRouter().push(`/students/${item.id}/report`)"
          >
            <IconsReportIcon class="w-5 h-[18px]" />
          </button>
          <button
            v-if="item.verify == '0'"
            type="button"
            class="action-btn tooltip"
            data-tip="ارسال OTP"
            :disabled="loading == 'send-otp' + item.id"
            @click="sendOTP(item)"
          >
            <span
              v-if="loading == 'send-otp' + item.id"
              class="w-4 h-4 loading loading-spinner"
            ></span>
            <IconsSendIcon v-else class="w-5 h-[18px]" />
          </button>

          <button
            v-if="item.verify == '1' && item.status.title == 'pending'"
            type="button"
            class="action-btn tooltip"
            data-tip="ارسل الاختبار المبدئي"
            @click="(activeData = item), ($modal.value = 'GeneralTest')"
          >
            <IconsAttendenceScheduleIcon class="w-5 h-[18px]" />
          </button>

          <!-- @click="(activeData = item), ($modal.value = 'GeneralTestApproval')" -->
          <button
            v-if="item.verify == '1' && item.status.title == 'general_test'"
            type="button"
            class="action-btn tooltip"
            data-tip=" نتيجة الاختبار المبدئي"
            @click="useRouter().push(`/students/${item.id}/global-test`)"
          >
            <IconsApprovalIcon class="w-5 h-[18px]" />
          </button>

          <button
            v-if="
              item.verify == '1' &&
              item.status.title == 'course_request' &&
              item.course_details
            "
            type="button"
            class="action-btn tooltip"
            data-tip="الموافقة علي الكورس"
            :disabled="loading == 'course-approval' + item.id + 'accept'"
            @click="courseApproval(item, 'accept')"
          >
            <span
              v-if="loading == 'course-approval' + item.id + 'accept'"
              class="w-4 h-4 loading loading-spinner"
            ></span>
            <IconsCheckIcon2 v-else class="w-5 h-[18px]" />
          </button>

          <button
            v-if="
              item.verify == '1' &&
              item.status.title == 'course_request' &&
              item.course_details
            "
            type="button"
            class="action-btn tooltip"
            data-tip="رفض الكورس"
            :disabled="loading == 'course-approval' + item.id + 'reject'"
            @click="courseApproval(item, 'reject')"
          >
            <span
              v-if="loading == 'course-approval' + item.id + 'reject'"
              class="w-4 h-4 loading loading-spinner"
            ></span>
            <IconsCrossCircleIcon v-else class="w-5 h-[18px]" />
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
          <button type="button" class="action-btn tooltip" data-tip="تعديل">
            <IconsEditIcon2 class="w-5 h-[18px]" />
          </button> -->
        </div>
      </template>
    </ThemeTable>

    <StudentsGeneralTestModal
      :activeData="activeData"
      v-if="$modal.value == 'GeneralTest'"
    />
    <StudentsGeneralTestApprovalModal
      :activeData="activeData"
      v-if="$modal.value == 'GeneralTestApproval'"
    />
    <SheikhCreate v-if="$modal.value == 'CreateItem'" />
    <ThemePlusButton
      @click.native="
        (useGlobalStore().activeItem = { role: 1 }),
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
const loading = ref("");
const activeData = ref("");
await useStudentStore().fetchData();
loading.value = "";
const data = computed(() => useStudentStore().data);
const meta = computed(() => useStudentStore().meta);

function paginationHandler($event) {
  useRouter()
    .replace({
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
    { text: $t("status"), value: "status" },
    { text: $t("course"), value: "course" },
    { text: $t("activation"), value: "active" },
    // { text: "ID", value: "id", width: 100 },
    { text: $t("actions"), value: "actions" },
  ];
});

// handle status filter
const status = computed(() => {
  const data = ref([]);
  $http("/status").then((res) => {
    const allCase = { label: "الجميع", id: "" };
    data.value = [allCase, ...res.response.data];
  });

  return data;
});

// search keyword section
const searchFilter = ref("");
function getFilterdData() {
  useRouter()
    .push({
      path: useRoute().path, // Keep the current path
      query: {
        ...useRoute().query, // Copy existing query parameters
        filter: searchFilter.value, // Update the page query
      },
    })
    .then(() => {
      useStudentStore().fetchData();
    });
}
const submitWithFilter = useDebounceFunc(getFilterdData, 1200);

const currentStatus = ref(useRoute().query.status_id || 0);
watch(currentStatus, async (n) => {
  await useRouter().replace({
    path: useRoute().path,
    query: {
      page: 1,
      status_id: currentStatus.value,
    },
  });
  useStudentStore().fetchData();
});

const sendOTP = (item) => {
  loading.value = "send-otp" + item.id;
  $http(`/user/send-otp/${item.id}`)
    .then(() => {
      loading.value = "";
      useStudentStore().fetchData();
      useToast().showSuccess("تم ارسال الكود بنجاح");
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = "";
      useToast().errorHandler(err);
    });
};
const courseApproval = (item, status) => {
  loading.value = "course-approval" + item.id + status;
  $http(`/admin/approve_courses_requests`, {
    method: "post",
    body: {
      user_id: item.id,
      course_id: item.course_details?.course?.id,
      status,
    },
  })
    .then(() => {
      loading.value = "";
      useStudentStore().fetchData();
      useToast().showSuccess();
      useNuxtApp().$closeModal();
    })
    .catch((err) => {
      loading.value = "";
      useToast().errorHandler(err);
    });
};

const platform = ref("");
onMounted(() => {
  const userAgent = navigator.userAgent;

  if (userAgent.match(/Android/i)) {
    platform.value = "Android";
  } else if (userAgent.match(/Windows/i)) {
    platform.value = "Windows";
  } else if (
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPad/i) ||
    userAgent.match(/iPod/i)
  ) {
    platform.value = "iPhone";
  } else {
    platform.value = "Unknown";
  }
});

async function activeHandler(id: number, value: any) {
  useStudentStore().loading = true;

  await $http(`/admin/users/activation/${id}?active=${value}`);
  useStudentStore().loading = false;
  useStudentStore().fetchData();
  useToast().showSuccess();
}
</script>

<style></style>

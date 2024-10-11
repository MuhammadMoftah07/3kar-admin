<template>
  <main>
    <ThemeTitle class="mb-6" :text="` تقرير الطالب  #${$route.params.id}`" />

    <aside
      v-if="error"
      class="px-10 py-4 font-bold text-red-600 bg-red-100 rounded-lg w-fit"
    >
      <p>خطأ في تحميل البيانات</p>
    </aside>

    <aside
      v-else-if="!data"
      class="px-10 py-4 font-bold rounded-lg text-slate-600 bg-slate-100 w-fit"
    >
      <p>لا يوجد بيانات</p>
    </aside>
    <template v-else-if="data">
      <section class="grid grid-cols-2 gap-4">
        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">الاسم</h5>
          <p class="font-bold text-slate-700">{{ data.name }}</p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">نتيجة الاختبار</h5>
          <p class="font-bold text-slate-700">
            {{ data.general_test_result }}%
          </p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">الكورس</h5>
          <p class="font-bold text-slate-700">{{ data.course_title }}</p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">الشيخ</h5>
          <p class="font-bold text-slate-700">{{ data.teacher_name }}</p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">اول جلسة</h5>

          <p class="font-bold text-slate-700">
            {{ dateFormate(data.first_session_date) }}
          </p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">مدة الكورس</h5>
          <p class="font-bold text-slate-700">
            {{ data.total_course_duration }} شهور
          </p>
        </aside>
      </section>

      <section class="mt-10">
        <p class="mb-6 text-xl font-bold text-slate-800">
          مستوي تقدم الطالب في المصحف
        </p>

        <div class="grid grid-cols-2 gap-6">
          <aside class="flex items-center font-semibold">
            <h5 class="w-32 text-slate-500">السورة</h5>
            <p class="font-bold text-slate-700">{{ data.surah_name }}</p>
          </aside>

          <aside class="flex items-center font-semibold">
            <h5 class="w-32 text-slate-500">الاية رقم</h5>
            <p class="font-bold text-slate-700">
              {{ data.session_to }}
            </p>
          </aside>

          <aside class="flex items-center col-span-2 font-semibold">
            <h5 class="w-32 text-slate-500">مستوي التقدم</h5>

            <div class="w-[620px] h-4 rounded-full bg-slate-200 relative">
              <span
                class="absolute font-bold -bottom-6 text-slate-500"
                :style="`right: ${surahPercentage(data.progress) - 4}%`"
              >
                {{ surahPercentage(data.progress) }} %
              </span>
              <span
                class="block h-4 rounded-full bg-gradient-to-l from-theme1 to-green-500"
                :style="`width: ${surahPercentage(data.progress)}%`"
              ></span>
            </div>
          </aside>

          <aside class="flex items-center font-semibold">
            <h5 class="w-32 text-slate-500">تقييم الطالب</h5>
            <div class="pointer-events-none rating rating-xl">
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="data.average_rate < 1 ? 'opacity-30' : ''"
              />
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="data.average_rate < 2 ? 'opacity-30' : ''"
              />
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="data.average_rate < 3 ? 'opacity-30' : ''"
              />
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="data.average_rate < 4 ? 'opacity-30' : ''"
              />
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="data.average_rate < 5 ? 'opacity-30' : ''"
              />
            </div>
            <span class="block pt-1 mx-3 font-bold text-slate-500">
              {{ parseFloat(data.average_rate).toFixed(1) }}
            </span>
          </aside>
        </div>
      </section>
    </template>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "authenticated",
});

const data = ref(null);
const error = ref(null);
try {
  const res = await $http(
    `/admin/reports?model=students&student_id=${useRoute().params.id}`
  );
  console.log("res", res.response);
  data.value = res.response;
} catch (err) {
  error.value = err.message || "Failed to fetch user data";
}

function dateFormate(dateString) {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Define options for formatting
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  // Format the date
  const formattedDate = date.toLocaleString("ar-US", options);
  return formattedDate;
}

function surahPercentage(value: number) {
  const percentage = value * 100;
  return (percentage / 114).toFixed(1);
}
// const headers = computed(() => {
//   return [
//     { text: $t("ID"), value: "id" },
//     { text: $t("name"), value: "name" },
//     { text: $t("phone"), value: "phone" },
//     { text: $t("gender"), value: "gender" },
//     { text: $t("qualification"), value: "qualification" },
//     { text: $t("job"), value: "job" },
//     { text: $t("nationality"), value: "nationality" },
//     { text: $t("verified"), value: "verify" },
//     { text: $t("status"), value: "status" },
//     { text: $t("course"), value: "course" },
//     { text: $t("activation"), value: "active" },
//     // { text: "ID", value: "id", width: 100 },
//     { text: $t("actions"), value: "actions" },
//   ];
// });

// handle status filter
</script>

<style></style>

<template>
  <main>
    <ThemeTitle class="mb-6" :text="` تقرير الكورس  #${$route.params.id}`" />

    <div
      v-if="error"
      class="px-10 py-4 font-bold text-red-600 bg-red-100 rounded-lg w-fit"
    >
      <p>خطأ في تحميل البيانات</p>
    </div>

    <div
      v-else-if="!data"
      class="px-10 py-4 font-bold rounded-lg text-slate-600 bg-slate-100 w-fit"
    >
      <p>لا يوجد بيانات</p>
    </div>
    <template v-else-if="data">
      <section class="grid grid-cols-2 gap-4">
        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">الكورس</h5>
          <p class="font-bold text-slate-700">{{ data.course_title }}</p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">الشيخ</h5>
          <p class="font-bold text-slate-700">{{ data.teacher_name }}</p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">مدة الكورس</h5>
          <p class="font-bold text-slate-700">
            {{ data.total_course_duration }} شهور
          </p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">بداية الكورس</h5>
          <p class="font-bold text-slate-700">
            {{ dateFormate(data.course_start) }}
          </p>
        </aside>

        <aside class="flex items-center font-semibold">
          <h5 class="w-32 text-slate-500">عدد الطلاب</h5>
          <p class="font-bold text-slate-700">{{ data.student_count }}</p>
        </aside>
      </section>

      <ThemeTable class="mt-8" :headers="headers" :items="data.students">
        <template #progress="item">
          <aside class="py-1 pb-2">
            <span class="block mb-1 font-bold text-slate-500">
              {{ surahPercentage(item.progress) }} %</span
            >
            <div class="w-1/2 h-2 rounded-full bg-slate-200">
              <span
                class="block h-2 rounded-full bg-gradient-to-l from-theme1 to-green-500"
                :style="`width: ${surahPercentage(item.progress)}%`"
              ></span>
            </div>
          </aside>
        </template>

        <template #rate="item">
          <aside class="py-1 pb-2">
            <span class="block font-bold text-slate-500">
              {{ parseFloat(item.rate).toFixed(1) }}
            </span>

            <div class="pointer-events-none rating rating-sm">
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="item.rate < 1 ? 'opacity-30' : ''"
              />
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="item.rate < 2 ? 'opacity-30' : ''"
              />
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="item.rate < 3 ? 'opacity-30' : ''"
              />
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="item.rate < 4 ? 'opacity-30' : ''"
              />
              <input
                type="radio"
                class="bg-orange-400 mask mask-star-2"
                :class="item.rate < 5 ? 'opacity-30' : ''"
              />
            </div>
          </aside>
        </template>
      </ThemeTable>

      <section
        class="flex gap-10 px-12 py-3 bg-orange-100 rounded-lg mt-7 w-fit"
      >
        <aside class="flex gap-4">
          <p class="font-semibold text-orange-700">متوسط التقدم</p>
          <p class="font-bold">
            {{ parseFloat(data.average_course_progress).toFixed(1) }}%
          </p>
        </aside>

        <aside class="flex gap-4">
          <p class="font-semibold text-orange-700">متوسط التقييم</p>
          <p class="font-bold">
            {{ parseFloat(data.average_course_rate).toFixed(1) }}%
          </p>
        </aside>
      </section>
    </template>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "authenticated",
});
const $t = useI18n().t;

//  course 5 teacher 104
const data = ref(null);
const error = ref(null);
try {
  const res = await $http(
    `/admin/reports?model=courses&course_id=${useRoute().params.id}`
  );
  console.log("res", res.response[0]);
  data.value = res.response[0];
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
const headers = computed(() => {
  return [
    { text: $t("name"), value: "name" },
    { text: "مستوي التقدم", value: "progress" },
    { text: "تقييم الطالب", value: "rate" },
  ];
});

function surahPercentage(value: number) {
  const percentage = value * 100;
  return (percentage / 114).toFixed(1);
}
// handle status filter
</script>

<style></style>

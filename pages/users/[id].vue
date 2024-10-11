<template>
  <main>
    <ThemeTitle
      class="mb-6"
      :text="`الصفحة الشخصية للمستخدم #${useRoute().params.id}`"
    />

    <div v-if="error">
      <p>Error loading user data.</p>
    </div>
    <section
      v-else-if="user"
      class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4"
    >
      <!-- Basic Info -->
      <div class="card-style">
        <h3 class="card-head">معلومات أساسية</h3>
        <p class="card-p"><strong>الاسم:</strong> {{ user.name }}</p>
        <p class="card-p"><strong>الهاتف:</strong> {{ user.phone }}</p>
        <p class="card-p">
          <strong>الدور:</strong> {{ $t(user.role.title) || "" }}
        </p>
        <p class="card-p"><strong>الجنس:</strong> {{ $t(user.gender) }}</p>
        <p class="card-p"><strong>الجنسية:</strong> {{ user.nationality }}</p>
        <p class="card-p"><strong>المؤهل:</strong> {{ user.qualification }}</p>
        <p class="card-p"><strong>الوظيفة:</strong> {{ user.job }}</p>
        <p class="card-p"><strong>الحالة:</strong> {{ user.status?.label }}</p>
        <p class="card-p"><strong>الرواية:</strong> {{ user.rewaya?.title }}</p>
      </div>

      <!-- Course Details -->
      <div class="card-style" v-if="user.course_details">
        <h3 class="card-head">تفاصيل الدورة</h3>
        <p class="card-p">
          <strong>العنوان:</strong> {{ user.course_details?.course.title }}
        </p>
        <p class="card-p">
          <strong>الوصف:</strong> {{ user.course_details.course.desc }}
        </p>
        <p class="card-p">
          <strong> الشيخ:</strong>
          {{ user.course_details.course.teacher.name }}
        </p>
        <p class="card-p">
          <strong>الحالة:</strong> {{ user.course_details.course.status }}
        </p>
        <p class="card-p">
          <strong>عدد الطلاب:</strong>
          {{ user.course_details.course.joined_student_count }}
        </p>
      </div>

      <!-- General Test Details -->
      <div class="card-style" v-if="user.general_test_details">
        <h3 class="card-head">تفاصيل الاختبار العام</h3>
        <p class="card-p">
          <strong>التاريخ:</strong> {{ user.general_test_details.date }}
        </p>
        <p class="card-p">
          <strong>النوع:</strong> {{ user.general_test_details.type }}
        </p>
      </div>

      <!-- Attachments -->
      <div class="card-style">
        <h3 class="card-head">المرفقات</h3>
        <ul class="card-p">
          <li v-for="attachment in user.attachments" :key="attachment.id">
            <a
              :href="attachment.attachment"
              class="text-blue-500 hover:underline"
            >
              {{ attachment.title || "مرفق" }}
            </a>
          </li>
        </ul>
      </div>

      <section class="col-span-3 pb-10">
        <ThemeTitle class="my-6" :text="`نتيجة الطالب`" />

        <StudentsResults
          :myResults="user.general_test_details?.results"
          noSubmit
        />
      </section>
    </section>

    <div v-else>
      <p>Loading...</p>
    </div>
  </main>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: "authenticated",
});
// Use the route parameter to fetch the correct user data
// Fetch user data using $fetch
const user = ref(null);
const error = ref(null);
try {
  const res = await $http(`/admin/users/${useRoute().params.id}`);
  console.log("res", res.response.data);
  user.value = res.response.data;
} catch (err) {
  error.value = err.message || "Failed to fetch user data";
}
</script>

<style scoped>
.card-style {
  @apply bg-slate-100  rounded-lg p-2 divide-y divide-slate-100;
}
.card-p {
  @apply text-sm text-slate-800 py-2;
}
.card-head {
  @apply font-semibold text-center mb-2 text-slate-50 bg-gradient-to-b -m-2 from-theme1 to-theme2 rounded-t-lg p-2;
}
</style>

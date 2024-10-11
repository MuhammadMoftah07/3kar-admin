<template>
  <section
    class="flex justify-center w-full min-h-screen mx-auto text-gray-900 bg-gray-100"
  >
    <div
      class="flex justify-center flex-1 max-w-screen-xl m-0 bg-white shadow sm:m-10 sm:rounded-lg"
    >
      <div class="p-6 lg:w-1/2 xl:w-5/12 sm:p-12">
        <div>
          <img class="w-24 mx-auto" src="~/assets/img/logo.png" />
        </div>

        <div class="flex flex-col items-center mt-8">
          <h1 class="text-2xl font-extrabold xl:text-3xl">سجل حساب جديد</h1>
          <div class="flex-1 w-full mt-8">
            <div class="flex flex-col items-center" v-if="false">
              <button class="social-btn">
                <div class="p-1 bg-white rounded-full">
                  <svg class="w-5 h-5" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span> دخول بحساب جوجل</span>
              </button>

              <button class="social-btn">
                <div class="p-1 bg-white rounded-full">
                  <IconsFacebookIcon class="w-5 h-5 text-facebook" />
                </div>
                <span> دخول بحساب فيسبوك</span>
              </button>
            </div>

            <div class="mt-3 mb-6 text-center border-b" v-if="false">
              <div
                class="inline-block px-2 text-sm font-medium leading-none tracking-wide text-gray-600 transform translate-y-1/2 bg-white"
              >
                او ادخل بالبريد الالكتروني
              </div>
            </div>

            <div class="grid max-w-xs gap-2 mx-auto">
              <input
                class="w-full px-4 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="الاسم"
                v-model="form.name"
              />
              <input
                class="w-full px-4 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                type="tel"
                dir="rtl"
                pattern="[0-9]{10}"
                placeholder="التلفون"
                @input="
                  $event.target.value = $event.target.value.replace(
                    /[^0-9]/g,
                    ''
                  )
                "
                v-model="form.phone"
              />
              <input
                class="w-full px-4 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="كلمة المرور"
                v-model="form.password"
              />
              <input
                class="w-full px-4 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="تأكيد كلمة المرور"
                v-model="form.password2"
              />
              <NuxtLink
                class="px-1 mt-1 text-sm font-medium hover:underline text-theme2 hover:text-green-500"
                to="/auth/login"
              >
                لدي حساب بالفعل
              </NuxtLink>
              <button
                class="flex w-full gap-4 mx-auto mt-2 bg-theme2 hover:bg-theme2/80 btn"
                @click="submit()"
                :disabled="loading"
                v-auto-animate
              >
                <span v-if="loading" class="loading loading-spinner"></span>
                <IconsAddUserIcon class="w-6 h-6" />
                <span> تسجيل دخول</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 hidden text-center bg-emerald-100 lg:flex">
        <img
          src="~/assets/img/man-reading.png"
          class="w-[calc(100%_-_100px)] object-contain mx-auto h-auto"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.social-btn {
  @apply btn justify-center w-full max-w-xs gap-3 py-3 font-bold text-gray-800 duration-200 bg-slate-100  rounded-lg border-slate-100 hover:shadow focus:shadow-sm my-2;
}
</style>
<script setup>
definePageMeta({
  layout: "auth",
});

const { signUp, signOut, data, token, status, getSession } = useAuth();
const loading = ref(false);
const form = reactive({});

const checkErrors = () => {
  if (form.password != form.password2) {
    useNuxtApp().$toast.error("كلمة المرور غير منطبقة");
    return false;
  }
  return true;
};

const submit = () => {
  if (!checkErrors()) return;
  loading.value = true;

  // $http("/admin/store", { method: "post", body: { ...form } });
  signUp({ ...form }, { callbackUrl: false })
    .then(() => {
      loading.value = false;
      useNuxtApp().$toast.success("تم التسجيل بنجاح، اهلا بك!");
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};
</script>

<template>
  <nav
    class="h-[60px] bg-gradient-to-b from-theme1 to-theme2 flex justify-between gap-4 px-1 md:px-4"
  >
    <!-- logo -->
    <NuxtLink to="/" class="self-center flex-shrink-0">
      <img
        class="h-12 p-1 mx-auto bg-white rounded-sm"
        src="~/assets/img/logo.png"
      />
    </NuxtLink>

    <!-- rest  -->
    <section class="flex items-center justify-between gap-8">
      <div
        class="items-center hidden gap-4 md:flex"
        v-if="status == 'authenticated'"
      >
        <!-- <button
          type="button"
          class="bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-25 btn btn-circle btn-sm"
        >
          <NotificationIcon class="w-5 h-5 text-white" />
        </button> -->

        <div class="dropdown dropdown-end">
          <label
            tabindex="0"
            class="flex items-center h-12 w-auto md:w-[220px] overflow-hidden gap-2 p-2 text-white bg-white rounded-lg cursor-pointer hover:bg-opacity-25 bg-opacity-10 focus:bg-white focus:text-slate-700 min-w-[170px]"
          >
            <IconsUserIcon
              class="w-8 h-8 p-1 rounded-full text-slate-50 bg-theme1"
            />

            <div class="grid">
              <span class="text-xs font-semibold">{{
                data.response.name
              }}</span>

              <span class="text-[10px] truncate">{{
                data.response.email
              }}</span>
            </div>

            <IconsArrowDownIcon
              class="w-4 h-4 border border-white border-solid rounded-full ms-auto"
            />
          </label>
          <ul
            tabindex="0"
            class="w-full gap-2 p-2 pt-4 -mt-2 rounded-none rounded-b-lg shadow dropdown-content menu bg-base-100"
          >
            <li>
              <!-- :to="$router.push('/account')" -->
              <p
                to="/account"
                @click.prevent="useToast().showCommingSoon()"
                class="text-xs font-semibold hover:bg-slate-100 bg-slate-50 text-slate-600"
              >
                <IconsUserIcon class="w-4 h-4" />
                <span>حسابي</span>
              </p>
            </li>
            <!-- <li>
                <NuxtLink
                  to
                  class="text-xs font-semibold hover:bg-slate-100 bg-slate-50 text-slate-600"
                >
                  <ProgressIcon class="w-4 h-4" />
                  <span>{{$t('my_progress')}}</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to
                  class="text-xs font-semibold hover:bg-slate-100 bg-slate-50 text-slate-600"
                >
                  <PreferenceIcon class="w-4 h-4" />
                  <span>{{$t('my_preferences')}}</span>
                </NuxtLink>
              </li>-->

            <li @click="logout()">
              <a
                class="text-xs font-semibold text-red-500 capitalize hover:bg-slate-100 bg-slate-50"
              >
                <IconsLogoutIcon class="w-4 h-4" />
                {{ "خروج" }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- not login  -->
      <div
        class="items-center flex-shrink-0 hidden gap-2 text-sm font-medium md:flex"
        v-else
      >
        <button
          type="button"
          class="h-10 px-2 text-white border rounded-lg sm:px-3 click-scale hover:bg-white hover:bg-opacity-10"
          @click="$router.push('/auth/login')"
        >
          {{ "دخول" }}
        </button>

        <button
          type="button"
          class="h-10 px-2 bg-white border rounded-lg sm:px-3 click-scale text-theme1 hover:bg-opacity-80"
          @click="$router.push('/auth/registration')"
        >
          {{ "حساب جديد" }}
        </button>
      </div>
    </section>
  </nav>
</template>

<script setup lang="ts">
const { status, signOut, data } = useAuth();
// Possible values for `status.value`: 'unauthenticated', 'loading', 'authenticated'

const route = useRoute();
const logout = async () => {
  await signOut();
  // User is now logged out
  route.push("/");
};
</script>

<style></style>

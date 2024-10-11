<template>
  <nav
    class="relative px-2 bg-gradient-to-b from-theme2 to-theme1"
    @mouseenter="collapseBtn = true"
    @mouseleave="collapseBtn = false"
  >
    <section class="w-full">
      <div class="flex flex-col mt-2 text-sm font-medium text-green-50">
        <NuxtLink
          class="nav-link tooltip-left"
          :class="sideCollapsed ? 'tooltip' : ''"
          data-tip="الرئيسية"
          :to="'/'"
          v-auto-animate="{ duration: 150 }"
        >
          <span class="min-w-[20px]">
            <IconsHomeIcon class="w-5 h-5" />
          </span>
          <p v-if="!sideCollapsed">الرئيسية</p>
        </NuxtLink>

        <NuxtLink
          class="nav-link tooltip-left"
          :class="sideCollapsed ? 'tooltip' : ''"
          data-tip="الوحدات"
          :to="'/units'"
          v-auto-animate="{ duration: 150 }"
        >
          <span class="min-w-[20px]">
            <IconsBuildingIcon class="w-5 h-5" />
          </span>
          <p v-if="!sideCollapsed">الوحدات</p>
        </NuxtLink>

        <NuxtLink
          class="nav-link tooltip-left"
          :class="sideCollapsed ? 'tooltip' : ''"
          data-tip="المدن"
          :to="'/cities'"
          v-auto-animate="{ duration: 150 }"
        >
          <span class="min-w-[20px]">
            <IconsBuildingIcon2 class="w-5 h-5" />
          </span>
          <p v-if="!sideCollapsed">المدن</p>
        </NuxtLink>

        <NuxtLink
          v-if="false"
          class="nav-link tooltip-left"
          :class="sideCollapsed ? 'tooltip' : ''"
          data-tip="الشيوخ"
          :to="'/sheikh'"
          v-auto-animate="{ duration: 150 }"
        >
          <span class="min-w-[20px]">
            <IconsTeacherIcon class="w-5 h-5" />
          </span>
          <p v-if="!sideCollapsed">الشيوخ</p>
        </NuxtLink>

        <NuxtLink
          v-if="false"
          class="nav-link tooltip-left"
          :class="sideCollapsed ? 'tooltip' : ''"
          data-tip="الطلاب"
          :to="'/students'"
          v-auto-animate="{ duration: 150 }"
        >
          <span class="min-w-[20px]">
            <IconsUsersIcon class="w-5 h-5" />
          </span>
          <p v-if="!sideCollapsed">الطلاب</p>
        </NuxtLink>

        <!-- dropdown list  -->
        <div class="dropdown dropdown-right dropdown-end" v-if="false">
          <div tabindex="0" role="button" class="nav-link">
            <span class="min-w-[20px]">
              <IconsReportIcon class="w-5 h-5" />
            </span>
            التقارير
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu divide-y divide-theme3 from-theme1 bg-gradient-to-bl to-theme3 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li
              @click="
                $router.push({
                  path: '/reports/students',
                  query: {
                    model: 'students',
                  },
                })
              "
            >
              <a>
                <p>الطلاب</p>
              </a>
            </li>
            <li
              @click="
                $router.push({
                  path: '/reports/teachers',
                  query: {
                    model: 'teachers',
                  },
                })
              "
            >
              <a>
                <p>الشيوخ</p>
              </a>
            </li>
            <li
              @click="
                $router.push({
                  path: '/reports/courses',
                  query: {
                    model: 'courses',
                  },
                })
              "
            >
              <a>
                <p>الكورسات</p>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr class="my-2 border-white/20" />

      <div
        class="flex flex-col text-sm font-medium text-green-50 scrollSmaller"
      >
        <NuxtLink
          class="nav-link tooltip-left"
          :class="sideCollapsed ? 'tooltip' : ''"
          data-tip="الحساب"
          :to="'/profile'"
          v-auto-animate="{ duration: 150 }"
        >
          <span class="min-w-[20px]">
            <IconsUserIcon class="w-5 h-5" />
          </span>
          <p v-if="!sideCollapsed">الحساب</p>
        </NuxtLink>
        <!-- <NuxtLink
          v-if="useRuntimeConfig().public.envMode == 'dev'"
          class="nav-link tooltip-left"
          :class="sideCollapsed ? 'tooltip' : ''"
          data-tip="الحساب"
          :to="'/components'"
          v-auto-animate="{ duration: 150 }"
        >
          <span class="min-w-[20px]">
            <IconsTypesIcon class="w-5 h-5" />
          </span>
          <p v-if="!sideCollapsed">Components</p>
        </NuxtLink> -->

        <!-- @click="useAuth().signOut()" -->
        <button
          @click="
            useAuth().signOut({ external: true, callbackUrl: '/auth/login' })
          "
          class="nav-link tooltip-left !text-red-300"
          :class="sideCollapsed ? 'tooltip' : ''"
          data-tip="تسجيل خروج"
          v-auto-animate="{ duration: 150 }"
        >
          <span class="min-w-[20px]">
            <IconsLogoutIcon class="w-5 h-5" />
          </span>
          <p v-if="!sideCollapsed">تسجيل خروج</p>
        </button>

        <hr class="my-2 border-white/20" />

        <p class="py-1 text-xs text-center text-slate-150">V 1.0</p>
      </div>
    </section>

    <!-- collapse button  -->
    <transition name="fade">
      <button
        class="absolute top-0 bottom-0 z-10 h-16 p-1 m-auto rounded-r-none cursor-pointer btn w-7 text-emerald-50 -left-7 bg-theme1 hover:bg-theme1 hover:contrast-125"
        @click="
          useGlobalStore().sideCollapsed = !useGlobalStore().sideCollapsed
        "
        v-if="collapseBtn"
      >
        <IconsRightArrowIcon2
          class="w-full scale-125"
          :class="sideCollapsed ? 'rotate-180' : ' '"
        />
      </button>
    </transition>
  </nav>
</template>

<script lang="ts" setup>
const collapseBtn = ref(false);
const sideCollapsed = computed(() => useGlobalStore().sideCollapsed);
</script>

<style scoped>
/* Side Nav toggle button  */
.navbtn-enter {
  transition: opacity 0.2s ease-out,
    transform 0.2s cubic-bezier(0.5, 0, 0.7, 0.4);
  transition-delay: calc(0.2s * (var(--total) - var(--i)));

  @apply translate-x-4;
}

.navbtn-leave-to {
  transition: opacity 0.2s ease-out,
    transform 0.2s cubic-bezier(0.5, 0, 0.7, 0.4);
  transition-delay: calc(0.2s * (var(--total) - var(--i)));

  @apply translate-x-4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* links style  */
.nav-link {
  @apply flex w-full gap-2 items-center p-3 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-xl duration-150;
}
.nav-link p {
  @apply duration-150;
}
.nav-link:hover p {
  @apply px-2;
}

.router-link-active {
  @apply bg-white text-theme1 hover:bg-white;
}

.router-link-exact-active {
  @apply bg-white text-theme1 hover:bg-white;
}
</style>

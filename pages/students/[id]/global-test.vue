<template>
  <main class="max-w-5xl pb-32">
    <ThemeTitle class="mb-6" :text="`تقييم الطالب #${useRoute().params.id}`" />

    <a
      class="fixed grid font-bold rounded-full w-14 h-14 btn bg-slate-800 hover:bg-slate-950 tooltip bottom-8 end-8 place-content-center"
      href="https://webdemo.agora.io/basicVoiceCall/index.html?appid=8efe83f17b464b59943f39d5759d4ed0&channel=3&token="
      target="_blank"
      rel="noopener noreferrer"
      data-tip="اذن الدخول"
    >
      <IconsVideoIcon class="w-8 h-8 text-slate-50" />
    </a>

    <StudentsResults />
  </main>
</template>

<style scoped></style>

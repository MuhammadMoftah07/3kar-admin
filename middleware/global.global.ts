export default defineNuxtRouteMiddleware((to, from) => {
  //close any opened modal
  useNuxtApp().$modal.value = "";
});

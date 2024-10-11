export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server
  // if (import.meta.server) return;
  const { status } = useAuth();
  if (status.value == "unauthenticated") {
    return navigateTo("/auth/login");
  }
});

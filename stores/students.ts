export const useStudentStore = defineStore("useStudentStore", {
  state: () => {
    return reactive({
      data: [],
      meta: {},
      loading: true,
    });
  },

  getters: {
    getter1: (state) => state.variable1.toUpperCase(),
  },

  actions: {
    fetchData() {
      this.loading = true;
      $http("/admin/users", {
        params: {
          role_id: 1,
          ...useRoute().query,
        },
      })
        .then((res) => {
          this.data = res.response.data;
          this.meta = res.response.meta;
          this.loading = false;
          return res;
        })
        .catch((err) => {
          this.loading = false;
          useToast().errorHandler(err);
        });
    },
  },
});

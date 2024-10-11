export const useReportsStore = defineStore("useReportsStore", {
  state: () => {
    return reactive({
      data: [],
      meta: {},
      loading: false,
    });
  },

  getters: {
    getter1: (state) => state.variable1.toUpperCase(),
  },

  actions: {
    fetchData() {
      this.loading = true;
      $http("admin/reports", {
        params: {
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
    fetchStudents() {
      this.loading = true;
      $http("admin/reports", {
        params: {
          ...useRoute().query,
        },
      })
        .then((res) => {
          this.data = res.response;
          // this.meta = res.response .meta;
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

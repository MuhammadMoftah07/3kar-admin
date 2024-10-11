export const useUnitsStore = defineStore("useUnitsStore", {
  state: () => {
    return reactive({
      data: [],
      meta: {},
    });
  },

  getters: {
    getter1: (state) => state.variable1.toUpperCase(),
  },

  actions: {
    fetchData() {
      $http("/admin/unit", {
        params: {
          per_page: 99,
          ...useRoute().query,
        },
      })
        .then((res) => {
          // this.data = res.response.data;
          this.data = res.response;
          this.meta = res.response.meta;
          return res;
        })
        .catch((err) => {
          useToast().errorHandler(err);
        });
    },
  },
});

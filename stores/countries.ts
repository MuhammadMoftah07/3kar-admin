export const useCountriesStore = defineStore("useCountriesStore", {
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
      $http("/admin/countries", {
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
  },
});

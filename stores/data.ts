export const useDataStore = defineStore("useDataStore", {
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
      $http("/data", {
        params: {
          per_page: 5,
          ...useRoute().query,
        },
      })
        .then((res) => {
          this.data = res.response.data;
          this.meta = res.response.meta;
          return res;
        })
        .catch((err) => {
          useToast().errorHandler(err);
        });
    },
  },
});

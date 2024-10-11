export const useRewayaStore = defineStore("useRewayaStore", {
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
      $http("/rewaya", {
        params: {
          per_page: 99,
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

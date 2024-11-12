import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    mainStore: {},
    pageType: ''
  }),
  getters: {},
  actions: {
    setMainStore(data) {
      this.mainStore = data || {};
    },
  },
  persist: true
});

export default useMainStore;

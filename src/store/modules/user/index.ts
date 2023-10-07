import { defineStore } from "pinia";
import { UserState } from "./types";

const useUserStore = defineStore("user", {
  state: (): UserState => ({
    name: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    setInfo() {
      this.name = "xx";
    },
  },
});

export default useUserStore;

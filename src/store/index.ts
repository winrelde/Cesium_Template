import { InjectionKey } from "vue";
import {
  ActionTree,
  createStore,
  GetterTree,
  MutationTree,
  Store,
  StoreOptions,
  useStore,
} from "vuex";

const initStateFunc = () => ({});

export type RootStateType = ReturnType<typeof initStateFunc>;

const getters: GetterTree<RootStateType, RootStateType> = {};
const mutations: MutationTree<RootStateType> = {};

const actions: ActionTree<RootStateType, RootStateType> = {};

const storeOptions: StoreOptions<RootStateType> = {
  state: initStateFunc,
  getters,
  mutations,
  actions,
};

const rootStore = createStore(storeOptions);

export default rootStore;

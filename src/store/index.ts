import Vue from 'vue';
import Vuex, { CommitOptions, DispatchOptions, MutationPayload, Store as VuexStore, StoreOptions } from 'vuex';
import { ProjectState, ProjectMutations } from '@/store/types'

import {Mutations as RootMutationsType, mutations} from './mutations';
import {Getters, getters} from './getters';
import {Actions, actions} from './actions';
import state, {modules} from './state';

import {Mutations as GpioMutationsType} from './gpio/mutations';

type MutationsType = RootMutationsType & GpioMutationsType;

// https://github.com/Ulibka68/vue3-vuex4-typescript

// https://github.com/iamcsharper/vue-ts-case/blob/master/src/store/index.ts

Vue.use(Vuex);

export type MyMutationPayload = MutationPayload & {
  type: keyof MutationsType,
};

export type Store = Omit<
  VuexStore<ProjectState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof MutationsType, P extends Parameters<MutationsType[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<MutationsType[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

const storeOptions: StoreOptions<ProjectState> = {
  state,
  mutations,
  getters,
  actions,
  modules
};

const store = new VuexStore<ProjectState>(storeOptions)

export function resetStoreState(state: ProjectState):void {
  store.replaceState(state);
}

export default store;
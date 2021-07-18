import Vuex, { CommitOptions, DispatchOptions, Module, MutationPayload, Store as VuexStore, StoreOptions } from 'vuex';
import { ProjectState, SerializableState } from '../types';
import { GpioState } from './types';
import {Mutations, mutations} from './mutations';

//'getters' | 'commit' | 'dispatch'
export type Store = Omit<
  VuexStore<GpioState>,
  'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}
// & {
//   dispatch<K extends keyof Actions>(
//     key: K,
//     payload?: Parameters<Actions[K]>[1],
//     options?: DispatchOptions
//   ): ReturnType<Actions[K]>
// } 
// & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>
//   }
// }

const state: GpioState = {
  configs: []
};

export const gpioSerializers: SerializableState<GpioState> = {
  deserialize(str: string) {
    return {
      ...state,
      ...(JSON.parse(str))
    }
  },
  serialize(state: GpioState) {
    const clone = { ...state } as Partial<GpioState>;

    return JSON.stringify(clone);
  }
}

export const gpio: Module<GpioState, ProjectState> = {
  state,
  mutations
}
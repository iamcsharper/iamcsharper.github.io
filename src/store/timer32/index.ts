import Vuex, { CommitOptions, DispatchOptions, Module, MutationPayload, Store as VuexStore, StoreOptions } from 'vuex';
import { ProjectState } from '../types';
import { CHMode, ClockSource, CountMode, Timer, Timer32State, timersCount } from './types';
import {Mutations, mutations} from './mutations';

//'getters' | 'commit' | 'dispatch'
export type Store = Omit<
  VuexStore<Timer32State>,
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

const defaultTimer:Timer  = {
  top: 1,
  prescaler: 1,
  countMode: CountMode.Forward,
  clockSource: ClockSource.Prescaler,
  ch1Mode: CHMode.Compare,
  isEnable: false,
};

const state: Timer32State = {
  timers: [...Array(timersCount).keys()].map(()=>({ ...defaultTimer })),
};

export const timer32: Module<Timer32State, ProjectState> = {
  state,
  mutations
}
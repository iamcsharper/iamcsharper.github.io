import Vuex, { CommitOptions, DispatchOptions, Module, MutationPayload, Store as VuexStore, StoreOptions } from 'vuex';
import { ProjectState } from '../types';
import { CaptureEdge, CHMode, ClockSource, CountMode, Timer, Timer32State, TimerChannel, TimerIntMode, timersCount } from './types';
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

const defaultChannel:TimerChannel = {
  mode: CHMode.Disable,
  noiseFilter: false,
  compareValue: 1,
  captureValue: 1,
  captureEdge: CaptureEdge.Rising,
  pwmInverted: false,
}

const defaultTimer:Timer  = {
  top: 1,
  prescaler: 1,
  countMode: CountMode.Forward,
  clockSource: ClockSource.Prescaler,
  channels: [...Array(4).keys()].map(() => ({...defaultChannel})),
  intMode: TimerIntMode.Interrupt,
  isEnable: false,
};

const state: Timer32State = {
  timers: [...Array(timersCount).keys()].map(()=>({ ...defaultTimer })),
};

export const timer32: Module<Timer32State, ProjectState> = {
  state,
  mutations
}
import { MutationTree } from 'vuex';
import { Timer, Timer32State, TimerIndexed } from './types';

export enum Timer32Mutations {
    PUSH_TIMER = 'PUSH_TIMER',
    CHANGE_TIMER_DATA = 'CHANGE_TIMER_DATA',
    REMOVE_TIMER = 'REMOVE_TIMER'
}

export type Mutations<S = Timer32State> = {
    [Timer32Mutations.PUSH_TIMER](state: S, payload: Timer): void;
    [Timer32Mutations.REMOVE_TIMER](state: S, payload: number): void;
    [Timer32Mutations.CHANGE_TIMER_DATA](state: S, payload: TimerIndexed): void;
};

export const mutations: MutationTree<Timer32State> & Mutations = {
    [Timer32Mutations.PUSH_TIMER](state, payload: Timer) {
        state.timers.push(payload);

        state.timers = [...state.timers];
    },
    [Timer32Mutations.REMOVE_TIMER](state, payload: number) {
        state.timers.splice(payload, 1);
        state.timers = [...state.timers];
    },
    [Timer32Mutations.CHANGE_TIMER_DATA](state, {data, index}: TimerIndexed) {
        const dataAsRecord = data as Record<string, string>;
        for (const key of Object.keys(dataAsRecord)) {
            (state.timers[index] as Timer & {
                [key: string]: unknown;
            })[key] = dataAsRecord[key];
        }
        state.timers = [...state.timers];
    }
}
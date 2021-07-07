import { MutationTree } from 'vuex';
import { GpioState, GpioMutations, GpioPinConfig } from './types';

export type Mutations<S = GpioState> = {
    [GpioMutations.PUSH_CONFIG](state: S, payload: GpioPinConfig): void;
    [GpioMutations.REMOVE_CONFIG](state: S, payload: string): void;
    [GpioMutations.CHANGE_CONFIG_DATA](state: S, payload: GpioPinConfig): void;
};

export const mutations: MutationTree<GpioState> & Mutations = {
    [GpioMutations.PUSH_CONFIG](state, payload: GpioPinConfig) {
        state.configs.push(payload);

        state.configs = [...state.configs];
    },
    [GpioMutations.REMOVE_CONFIG](state, payload: string) {
        state.configs = state.configs.filter(e=>e.name !== payload);
    },
    [GpioMutations.CHANGE_CONFIG_DATA](state, payload: GpioPinConfig) {
        const find = state.configs.findIndex((e=>e.name === payload.name));

        if (find !== -1) {
            state.configs[find] = payload;

            state.configs = [...state.configs];
        }
    }
}
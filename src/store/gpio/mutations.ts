import { MutationTree } from 'vuex';
import { GpioState, GpioMutations, GpioPinConfig, GpioPinConfigIndexed } from './types';

export type Mutations<S = GpioState> = {
    [GpioMutations.PUSH_CONFIG](state: S, payload: GpioPinConfig): void;
    [GpioMutations.REMOVE_CONFIG](state: S, payload: string): void;
    [GpioMutations.CHANGE_CONFIG_DATA](state: S, payload: GpioPinConfigIndexed): void;
};

export const mutations: MutationTree<GpioState> & Mutations = {
    [GpioMutations.PUSH_CONFIG](state, payload: GpioPinConfig) {
        state.configs.push(payload);

        state.configs = [...state.configs];
    },
    [GpioMutations.REMOVE_CONFIG](state, payload: string) {
        state.configs = state.configs.filter(e=>e.name !== payload);
    },
    [GpioMutations.CHANGE_CONFIG_DATA](state, {data, index}: GpioPinConfigIndexed) {
        const dataAsRecord = data as Record<string, string>;
        for (const key of Object.keys(dataAsRecord)) {
            (state.configs[index] as GpioPinConfig & {
                [key: string]: unknown;
            })[key] = dataAsRecord[key];
        }
        state.configs = [...state.configs];
    }
}
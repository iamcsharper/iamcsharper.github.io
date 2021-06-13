import { Peripherals } from '@/shared/peripherals';
import { MutationTree } from 'vuex';
import { ProjectState, ProjectMutations, Pin } from './types';

export type Mutations<S = ProjectState> = {
    [ProjectMutations.SET_PROJECT_NAME](state: S, payload: string): void;
    [ProjectMutations.SET_SELECTED_PERIPHERAL](state: S, payload: Peripherals): void;
    [ProjectMutations.INCREMENT_VERSION](state: S): void;

    [ProjectMutations.SET_LOADED_STATE](state: S, payload: boolean): void;

    [ProjectMutations.SET_IS_LOADING](state: S, payload: boolean): void;
    [ProjectMutations.ADD_ERROR](state: S, payload: Error): void;
    [ProjectMutations.PUSH_PIN](state: S, payload: Pin): void;
    [ProjectMutations.CHANGE_PIN_DATA](state:S, payload: Pin): void;
};

export const mutations: MutationTree<ProjectState> & Mutations = {
    [ProjectMutations.SET_PROJECT_NAME](state, payload: string) {
        state.projectName = payload;
    },
    [ProjectMutations.SET_SELECTED_PERIPHERAL](state, payload: Peripherals) {
        state.selectedPeripheral = payload;
    },
    [ProjectMutations.INCREMENT_VERSION](state) {
        state.counter++;
    },
    [ProjectMutations.SET_LOADED_STATE](state, payload: boolean) {
        state.isProjectLoaded = payload;
    },
    [ProjectMutations.SET_IS_LOADING](state, payload: boolean) {
        state.isLoading = payload;
    },
    [ProjectMutations.ADD_ERROR](state, payload: Error) {
        console.error(payload);
        state.errors.push(payload);
        if (state.isLoading) {
            state.isLoading = false;
        }
    },
    [ProjectMutations.PUSH_PIN](state, payload: Pin) {
        state.pinout.push(payload);

        state.pinout = [...state.pinout];
    },
    [ProjectMutations.CHANGE_PIN_DATA](state, payload: Pin) {
        const find = state.pinout.findIndex((e=>e.id === payload.id));

        if (find !== -1) {
            state.pinout[find] = payload;

            state.pinout = [...state.pinout];
        }
    }
}
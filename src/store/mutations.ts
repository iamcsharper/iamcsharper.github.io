import { Peripherals } from '@/shared/peripherals';
import { MutationTree } from 'vuex';
import { ProjectState, ProjectMutations } from './types';

export type Mutations<S = ProjectState> = {
    [ProjectMutations.SET_PROJECT_NAME](state: S, payload: string): void;
    [ProjectMutations.SET_SELECTED_PERIPHERAL](state: S, payload: Peripherals): void;
    [ProjectMutations.INCREMENT_VERSION](state: S): void;

    [ProjectMutations.SET_LOADED_STATE](state: S, payload: boolean): void;

    [ProjectMutations.SET_IS_LOADING](state: S, payload: boolean): void;
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
    }
}
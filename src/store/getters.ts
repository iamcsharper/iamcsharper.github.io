import { Peripherals } from '@/shared/peripherals'
import { GetterTree } from 'vuex'
import { ProjectState } from './types'

export type Getters = {
  doubledCounter(state: ProjectState): number,
  getSelectedPeripheral(state: ProjectState): Peripherals,
  getIsLoading(state: ProjectState): boolean
}

export const getters: GetterTree<ProjectState, ProjectState> & Getters = {
  doubledCounter: (state) => {
    return state.counter * 2
  },
  getSelectedPeripheral(state): Peripherals {
    return state.selectedPeripheral;
  },
  getIsLoading(state): boolean {
    return state.isLoading;
  }
}
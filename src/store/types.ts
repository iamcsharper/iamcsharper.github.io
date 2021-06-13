import { Peripherals } from "@/shared/peripherals";

export interface ProjectState {
  isLoading: boolean;
  isProjectLoaded: boolean;
  isProjectSaved: boolean;
  counter: number;
  projectName: string;
  selectedPeripheral: Peripherals;
}


export enum ProjectMutations {
  SET_PROJECT_NAME='SET_PROJECT_NAME',
  SET_SELECTED_PERIPHERAL='SET_SELECTED_PERIPHERAL',
  INCREMENT_VERSION='INCREMENT_VERSION',

  SET_LOADED_STATE='SET_LOAD_STATE',
  SET_IS_LOADING='SET_IS_LOADING'
}

export enum ProjectActions {
    LOAD_GITHUB = 'LOAD_GITHUB',
    SAVE_PROJECT = 'SAVE_PROJECT',
    LOAD_PROJECT = 'LOAD_PROJECT'
}
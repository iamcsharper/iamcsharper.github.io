import { Peripherals } from "@/shared/peripherals";
import { Module } from "vuex";
import { modules } from "./state";

export interface Pin {
  id: number;
  name: string;
  analog: string;
  modes: PinMode[];

  selectedMode: number | null;
}

export interface PinMode {
  sign: string;
  text: string;
  type: PinModeType;
}

export enum PinModeType {
  IO = 'IO',
  GND = 'GND',
  Input = 'Input',
  Output = 'Output',
  Power = 'Power',
  OSC = 'OSC'
}

export const pinModeTypeArray = Object.values(PinModeType) as string[];

type extractGeneric<Type> = Type extends Module<infer X, never> ? X : never

type ModulesType = {
  [key in keyof typeof modules]: extractGeneric<typeof modules[key]>;
};

export interface ProjectState {
  isLoading: boolean;
  isProjectLoaded: boolean;
  isProjectSaved: boolean;
  counter: number;
  projectName: string;
  selectedPeripheral: Peripherals;
  errors: Error[];

  pinout: Pin[];
}

export type AugmentedProjectState = ProjectState & ModulesType;

export enum ProjectMutations {
  SET_PROJECT_NAME = 'SET_PROJECT_NAME',
  SET_SELECTED_PERIPHERAL = 'SET_SELECTED_PERIPHERAL',
  INCREMENT_VERSION = 'INCREMENT_VERSION',

  SET_LOADED_STATE = 'SET_LOADED_STATE',
  SET_IS_LOADING = 'SET_IS_LOADING',

  ADD_ERROR = 'ADD_ERROR',
  PUSH_PIN = 'PUSH_PIN',
  CHANGE_PIN_DATA = 'CHANGE_PIN_DATA',
}

export enum ProjectActions {
  LOAD_GITHUB = 'LOAD_GITHUB',
  SAVE_PROJECT = 'SAVE_PROJECT',
  LOAD_PROJECT = 'LOAD_PROJECT'
}
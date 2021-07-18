import { Peripherals } from "@/shared/peripherals";
import { Module } from "vuex";
import { modules } from "./state";

export interface Pin {
  id: number;
  port: number | null;
  num_in_port: number | null; 
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

export type ModulesType = {
  [key in keyof typeof modules]: extractGeneric<typeof modules[key]>;
};

export type EncodedModulesType = {
  [key in keyof typeof modules]: string;
}

export interface ProjectState {
  isLoading: boolean;
  isProjectLoaded: boolean;
  isProjectSaved: boolean;
  counter: number;
  projectName: string;
  selectedPeripheral: Peripherals;
  errors: Error[];
  pinout: Pin[];
  clockSvg: string | null;
}

export type AugmentedProjectState = ProjectState & ModulesType;

export type SerializeFunction<S> = (state: S) => string;
export type DeserializeFunction<S> = (str: string) => S;
export interface SerializableState<S> {
  serialize: SerializeFunction<S>,
  deserialize: DeserializeFunction<S>,
}

export type Serializers = {
  [key in keyof typeof modules]: SerializableState<
    extractGeneric<typeof modules[key]>
  >
};

export enum ProjectMutations {
  SET_PROJECT_NAME = 'SET_PROJECT_NAME',
  SET_SELECTED_PERIPHERAL = 'SET_SELECTED_PERIPHERAL',
  INCREMENT_VERSION = 'INCREMENT_VERSION',

  SET_LOADED_STATE = 'SET_LOADED_STATE',
  SET_IS_LOADING = 'SET_IS_LOADING',

  ADD_ERROR = 'ADD_ERROR',
  PUSH_PIN = 'PUSH_PIN',
  CHANGE_PIN_DATA = 'CHANGE_PIN_DATA',

  SET_CLOCK_SVG = 'SET_CLOCK_SVG',
}

export enum ProjectActions {
  LOAD_GITHUB = 'LOAD_GITHUB',
  LOAD_CLOCK_SVG = 'LOAD_CLOCK_SVG',
  SAVE_PROJECT = 'SAVE_PROJECT',
  LOAD_PROJECT = 'LOAD_PROJECT',
}
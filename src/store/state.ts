import { Peripherals } from "@/shared/peripherals";
import { ProjectState, SerializableState, Serializers } from "./types";

import { gpio, gpioSerializers } from './gpio/index';
import { timer32, timer32Serializers } from './timer32/index';

export const rootSerializers: SerializableState<ProjectState> = {
  deserialize(str: string) {
    return {
      ...state,
      ...(JSON.parse(str))
    }
  },
  serialize(state: ProjectState) {
    const clone = { ...state } as Partial<ProjectState>;
    delete clone.clockSvg;
    delete clone.errors;
    delete clone.pinout;
    delete clone.isLoading;

    return JSON.stringify(clone);
  }
};

export const modules = {
  gpio,
  timer32
};

export const serializers: Serializers = {
  gpio: gpioSerializers,
  timer32: timer32Serializers,
}

const state: ProjectState = {
  isLoading: false,
  counter: 0,
  projectName: 'Project#0',
  selectedPeripheral: Peripherals.GPIO,
  isProjectLoaded: false,
  isProjectSaved: false,
  errors: [],
  pinout: [],
  clockSvg: null,
};

export default state;
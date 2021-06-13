import { Peripherals } from "@/shared/peripherals";
import { ProjectState } from "./types";

import { gpio } from './gpio/index';

export const modules = {
  gpio
};

const state: ProjectState = {
  isLoading: false,
  counter: 0,
  projectName: 'Project#0',
  selectedPeripheral: Peripherals.GPIO,
  isProjectLoaded: false,
  isProjectSaved: false,
  errors: [],
  pinout: [],
};

export default state;
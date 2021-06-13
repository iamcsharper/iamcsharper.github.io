import { Peripherals } from "@/shared/peripherals";
import { ProjectState } from "./types";

const state: ProjectState = {
    isLoading: false,
    counter: 0,
    projectName: 'Project#0',
    selectedPeripheral: Peripherals.GPIO,
    isProjectLoaded: false,
    isProjectSaved: false
};

export default state;
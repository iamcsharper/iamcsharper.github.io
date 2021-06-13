import {Module} from 'vuex';
import { ProjectState } from '../types';
import { GpioState } from './types';

const state: GpioState = {
    foo: 'bar'
};

export const gpio: Module<GpioState, ProjectState> = {
    state,
    getters: {
        foo(state) {
            return state.foo;
        }
    }
}
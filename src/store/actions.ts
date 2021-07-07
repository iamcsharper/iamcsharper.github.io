import axios from 'axios';
import convert, { Element } from 'xml-js';

import { ProjectState, ProjectActions, ProjectMutations, Pin, PinMode, pinModeTypeArray, PinModeType } from './types';
import { mainUrl, mappingUrl } from '@/config/github.config';
import { Mutations } from './mutations';
import { ActionContext } from 'vuex';

import { resetStoreState } from './index';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ProjectState, ProjectState>, 'commit'>

export type saveMethod = 'file' | 'localstorage' | 'none';

export interface Actions {
  [ProjectActions.LOAD_GITHUB](
    { commit }: AugmentedActionContext): Promise<number>,
  [ProjectActions.SAVE_PROJECT](
    { commit }: AugmentedActionContext, method: saveMethod): Promise<void>,
  [ProjectActions.LOAD_PROJECT](
    {commit}: AugmentedActionContext, method: saveMethod): Promise<void>
}

export const actions = {
  async [ProjectActions.LOAD_GITHUB](
    {commit}: AugmentedActionContext): Promise<void> {
    const response = await axios.get(mappingUrl);

    const xmlData = convert.xml2js(response.data);
        
    const el = xmlData.elements[1] as Element;
        
    if (!el || !el.elements) {
      commit(ProjectMutations.ADD_ERROR, 
        new Error('Bad xml data: no root element'));
      return;
    }
    
    const pinout = (el.elements[0] as Element).elements;

    if (!pinout) {
      commit(ProjectMutations.ADD_ERROR, 
        new Error('Bad xml data: no pin elements'));
      return;
    }

    for (const pinElement of pinout) {
      const {attributes, elements} = pinElement;
      if (!attributes || !elements) {
        commit(ProjectMutations.ADD_ERROR, 
          new Error(`Bad xml data: pin ${JSON.stringify(pinElement.text)} 
          has no attrs or elements`));
        return;
      }
      const {id, name} = attributes;

      const analog = typeof attributes.analog === 'string' 
        ? attributes.analog : '';

      if (typeof id !== 'string' || typeof name !== 'string') {
        commit(ProjectMutations.ADD_ERROR, 
          new Error(`Bad xml data: pin ${JSON.stringify(pinElement)} has 
          at least one wrong attr (id, name) = (${id}, ${name})`));
        return;
      }

      if (!pinElement.elements?.length) {
        commit(ProjectMutations.ADD_ERROR, 
          new Error(`Bad xml data: pin ${JSON.stringify(pinElement)} 
          has no mode elements`));
        return;
      }

      const splitted = name.split('_');
      const isPort = splitted[0] === 'PORT';
      const port = isPort ? parseInt(splitted[1]) : null;
      const num_in_port = isPort ? parseInt(splitted[2]) : null;
      console.log('num_in_port=', num_in_port);
      const modeElements = pinElement.elements;
      const modes: PinMode[] = [];

      for (const modeElement of modeElements) {
        const modeAttrs = modeElement.attributes;
        const modeTextElements = modeElement.elements;
        
        if (!modeAttrs || !modeTextElements || typeof modeTextElements[0].text !== 'string') {
          commit(ProjectMutations.ADD_ERROR, new Error(
            `Bad xml data: pin ${JSON.stringify(pinElement)}
            mode ${JSON.stringify(modeElement)} has no attrs or text content`));
          return;
        }

        const {sign, type} = modeAttrs;

        if (typeof sign !== 'string' || typeof type !== 'string') {
          commit(ProjectMutations.ADD_ERROR, new Error(
            `Bad xml data: pin ${JSON.stringify(pinElement)} mode 
            ${JSON.stringify(modeElement)} has at least one
            attr null or missing(sign, type)`));
          return;
        }

        if (!pinModeTypeArray.includes(type)) {
          commit(ProjectMutations.ADD_ERROR, new Error(
            `Bad xml data: pin ${JSON.stringify(pinElement)} mode 
            ${JSON.stringify(modeElement)} has unknown mode ${type}, 
            expected any of ${pinModeTypeArray.join(', ')}`));
          return;
        }

        modes.push({
          sign,
          text: modeTextElements[0].text,
          type: type as PinModeType
        })
      }

      commit(ProjectMutations.PUSH_PIN, {
        selectedMode: null,
        id: parseInt(id),
        port,
        num_in_port,
        name,
        modes,
        analog
      });
    }
  },
  async [ProjectActions.SAVE_PROJECT](
    {commit, state}: AugmentedActionContext, method: saveMethod): Promise<void> {
    if (method === 'localstorage') {
      commit(ProjectMutations.INCREMENT_VERSION);
      window.localStorage.setItem('project', JSON.stringify(state));
    } 
    else if (method === 'file') {
      commit(ProjectMutations.INCREMENT_VERSION);

      const mainContents = await axios.get(mainUrl);

      console.log(mainContents);

      const stateCopy = {
        ...state,
      } as Partial<Omit<ProjectState, 'pinout'> & {
        pinout: Partial<Pin>[]
      }>;

      delete stateCopy.isLoading;
      delete stateCopy.errors;

      stateCopy.pinout = stateCopy.pinout?.map(({
        id,
        selectedMode,
      }) => {
        return {
          id,
          selectedMode,
        }
      });

      const text = JSON.stringify(stateCopy);
      const filename = state.projectName.replace(/\s/g, '_') + '.txt';
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
    else {
      commit(ProjectMutations.ADD_ERROR, new Error('Unsupported save method'));
      return;
    }
  },
  async [ProjectActions.LOAD_PROJECT](
    {commit}: AugmentedActionContext, method: saveMethod): Promise<void> {
    if (method === 'none') {
      commit(ProjectMutations.SET_LOADED_STATE, true);
    }
    else if (method === 'localstorage') {
      commit(ProjectMutations.SET_IS_LOADING, true);

      const item = window.localStorage.getItem('project');
      const loadedState = item ? (JSON.parse(item) as ProjectState) : null;
  
      if (loadedState) {
        resetStoreState(loadedState);

        commit(ProjectMutations.SET_LOADED_STATE, true);
        commit(ProjectMutations.SET_IS_LOADING, false);
      } else {
        commit(ProjectMutations.ADD_ERROR, new Error('Could not load state from localstorage: no key'));
        return;
      }
    } else {
      commit(ProjectMutations.ADD_ERROR, new Error('Unsupported save method'));
      return;
    }
  }
}
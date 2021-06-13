import axios from 'axios';
import convert, { Element } from 'xml-js';

import { ProjectState, ProjectActions, ProjectMutations } from './types';
import { mappingUrl } from '@/config/github.config';
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
  [ProjectActions.LOAD_PROJECT]({commit}: AugmentedActionContext, method: saveMethod): Promise<void>
}

export const actions = {
  async [ProjectActions.LOAD_GITHUB]({commit}: AugmentedActionContext): Promise<void> {
    const response = await axios.get(mappingUrl);
        
    const xmlData = convert.xml2js(response.data);
        
    const el = xmlData.elements[1] as Element;
        
    if (!el || !el.elements) {
        throw new Error('Bad xml data!');
    }
    
    const pinout = (el.elements[0] as Element).elements;
    
    console.log(pinout);
  },
  async [ProjectActions.SAVE_PROJECT](
    {commit, state}: AugmentedActionContext, method: saveMethod): Promise<void> {
    if (method === 'localstorage') {
      commit(ProjectMutations.INCREMENT_VERSION);
      window.localStorage.setItem('project', JSON.stringify(state));
    } else {
      throw new Error('Unsupported save method');
    }
  },
  async [ProjectActions.LOAD_PROJECT]({commit}: AugmentedActionContext, method: saveMethod): Promise<void> {
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
        throw new Error('Could not load state from localstorage: no key')
      }
    } else {
      throw new Error('Unsupported save method');
    }
  }
}
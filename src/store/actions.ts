import axios from 'axios';
import convert, { Element } from 'xml-js';

import { ProjectState, ProjectActions, ProjectMutations, Pin, PinMode, pinModeTypeArray, PinModeType, AugmentedProjectState, SerializableState, ModulesType, EncodedModulesType } from './types';
import { mainUrl, mappingUrl, clockSvg } from '@/config/links';
import { Mutations } from './mutations';
import { ActionContext } from 'vuex';

import { resetStoreState } from './index';
import { CodeGen } from '@/shared/codeGen';
import { modules, rootSerializers, serializers } from './state';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<AugmentedProjectState, AugmentedProjectState>, 'commit'>

export type saveMethod = 'file' | 'localstorage' | 'empty';

export interface Actions {
  [ProjectActions.LOAD_GITHUB](
    { commit }: AugmentedActionContext): Promise<number>,
  [ProjectActions.LOAD_CLOCK_SVG](
    { commit }: AugmentedActionContext): Promise<Blob>,
  [ProjectActions.SAVE_PROJECT](
    { commit }: AugmentedActionContext, method: saveMethod): Promise<void>,
  [ProjectActions.LOAD_PROJECT](
    {commit}: AugmentedActionContext, method: saveMethod): Promise<void>
}

export const actions = {
  async [ProjectActions.LOAD_CLOCK_SVG](
    { commit }: AugmentedActionContext): Promise<void> {
    const { data } = await axios.get(clockSvg);

    const svg = btoa(
      unescape(
        encodeURIComponent(data)
      )
    );

    commit(ProjectMutations.SET_CLOCK_SVG, svg);
  },
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

      const rootState: (ProjectState & Partial<ModulesType>) = {
        ...state
      };

      for (const module in modules) {
        delete (rootState as Record<string, any>)[module];
      }

      const serObj: Record<string, any> = {
        root: rootSerializers.serialize(rootState),
      };

      for (const [k, v] of Object.entries(serializers)) {
        serObj[k] = (v as SerializableState<any>).serialize(
          (state as Record<string,any>)[k]
        );
      }

      window.localStorage.setItem('project', JSON.stringify(serObj));
    } 
    else if (method === 'file') {
      commit(ProjectMutations.INCREMENT_VERSION);

      const mainContents = await axios.get(mainUrl);

      const codeGen = new CodeGen(mainContents.data, state);

      codeGen.generate();
      
      const filename = 'main.c';
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(codeGen.text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      //element.click();

      document.body.removeChild(element);
    }
    else {
      commit(ProjectMutations.ADD_ERROR, new Error('Unsupported save method'));
    }
  },
  async [ProjectActions.LOAD_PROJECT](
    {commit}: AugmentedActionContext, method: saveMethod): Promise<void> {
    if (method === 'empty') {
      commit(ProjectMutations.SET_LOADED_STATE, true);
    }
    else if (method === 'localstorage') {
      commit(ProjectMutations.SET_IS_LOADING, true);

      const item = window.localStorage.getItem('project');
      let loadedState: Record<string, any> | null = null;

      if (item) {
        const decoded = JSON.parse(item) as (EncodedModulesType & {
          root: string
        });

        loadedState = {
          ...(rootSerializers.deserialize(decoded.root)),
        };
  
        for (const [k, v] of Object.entries(serializers)) {
          loadedState[k] = (v as SerializableState<any>).deserialize(
            (decoded as Record<string,any>)[k]
          );
        }
      }
      // const loadedState = item ? (JSON.parse(item) as AugmentedProjectState) : null;
  
      if (loadedState) {
        resetStoreState(loadedState as AugmentedProjectState);

        commit(ProjectMutations.SET_LOADED_STATE, true);
        commit(ProjectMutations.SET_IS_LOADING, false);
      } else {
        commit(ProjectMutations.ADD_ERROR, new Error('Could not load state from localstorage: no key'));
      }
    } else {
      commit(ProjectMutations.ADD_ERROR, new Error('Unsupported save method'));
      return;
    }
  }
}
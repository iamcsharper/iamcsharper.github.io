<template>
  <div id="app">
    <div v-if="errors.length" style="padding-top:50px">
      <div class="errors">
        <pre
        :data-caption="error.name"
        v-for="(error,i) in errors"
        :key="i">{{ typeof error.stack === 'string' ? error.stack.replace(error.name + ': ', '') : '' }}</pre>
      </div>
    </div>
    <div v-show="isLoading" style="position: fixed; z-index: 1000; left:0;right:0;top:0;bottom:0; background-color:#000;opacity:0.8;">
      <div style="display: flex;width: 100%; height: 100%;align-items: center;justify-content: center;">
        <img src="@/assets/preloader.svg?data" />
      </div>
    </div>
    <tabs :tabs="['Периферия', 'Clock', 'Настройки проекта']" v-if="isProjectLoaded">
        <template slot="Периферия">
          <split-pane :min-percent='20' :default-percent='48' split="vertical">
            <template slot="paneL">
              <split-pane :min-percent='20' :default-percent='20' split="vertical">
                <template slot="paneL">
                  <PeripheryList />
                </template>
                <template slot="paneR">
                  <PeripheryProperties />
                </template>
              </split-pane>
            </template>
            <template slot="paneR">        
              <aside class="chipview__container">
                <ChipView/>
              </aside>
            </template>
          </split-pane>
        </template>
        <template slot="Clock">
          <ClockView/>
        </template>
        <template slot="Настройки проекта">
          <ProjectSettingsView />
        </template>
    </tabs>
    <div class="project-loader" v-else>
      <div class="project-loader__container">
        <h4 id="step-init">Выберите способ загрузки проекта:</h4>
        <div class="project-loader__container-buttons">
          <button class="button button-lg" @click="loadFromSketch" id="step-new">Новый</button>
          <button class="button button-lg" disabled id="step-file">Из файла</button>
          <button class="button button-lg" @click="loadFromLocalStorage" :disabled="!hasLocalStorage" id="step-local">Из localstorage</button>
        </div>
      </div>
      <v-tour name="welcomeTour" :steps="welcomeTourSteps"></v-tour>
    </div>
    <!-- <LoadProjectView/> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ChipView from './components/Chipview.vue';
import PeripheryList from './components/PeripheryList.vue'
import ProjectSettingsView from './components/ProjectSettingsView.vue';
import PeripheryProperties from './components/properties/PeripheryProperties.vue';
import ClockView from './components/Clockview.vue';

import Tabs from './components/standart/Tabs.vue';
import VueStrong from '@/vueStrong';
import { ProjectActions, ProjectMutations } from './store/types';
import axios from 'axios';

import introJs, { Step } from 'intro.js';
import { createIntro } from './shared/helpers';

@Component({
  components: {
    ClockView,
    ChipView,
    PeripheryList,
    PeripheryProperties,
    Tabs,
    ProjectSettingsView,
  },
})
export default class App extends VueStrong {
  welcomeTourSteps: Step[] = [
    {
      element: '#step-init',
      title: 'Добро пожаловать',
      intro: `Откройте возможности конфигуратора MIK32 прямо сейчас!`
    },
    {
      element: '#step-new',
      title: 'Новый',
      intro: `Создать пустой проект (внимание - при сохранении в LocalStorage вы удалите старый)`
    },
    {
      element: '#step-file',
      title: 'Файл',
      intro: `Опция пока недоступна, в дальнейшем планируется запись и чтение проекта настроек из файла`
    },
    {
      element: '#step-local',
      title: 'Из локального хранилища',
      intro: `Загрузить проект из LocalStorage (не очищайте куки и прочие файлы браузера чтобы не потерять данные)`
    },
  ];

  mounted():void {
    axios.interceptors.request.use((config) => {
      // spinning start to show
      this.$store.commit(ProjectMutations.SET_IS_LOADING, true);

      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      this.$store.commit(ProjectMutations.SET_IS_LOADING, false);

      return response;
    }, function (error) {
      return Promise.reject(error);
    });

    this.$store.dispatch(ProjectActions.LOAD_GITHUB);

    if (window.localStorage.getItem('uzhe_smesharik') !== '1') {
      createIntro().setOptions({
        steps: this.welcomeTourSteps,
      }).start().oncomplete(()=>{
        window.localStorage.setItem('uzhe_smesharik', '1');
      });
    }
  }

  loadFromSketch(): void {
    this.$store.dispatch(ProjectActions.LOAD_PROJECT, 'empty');
  }

  loadFromLocalStorage(): void {
    this.$store.dispatch(ProjectActions.LOAD_PROJECT, 'localstorage');
  }

  get isProjectLoaded(): boolean {
    return this.$store.state.isProjectLoaded;
  }
  
  get isLoading(): boolean {
    return this.$store.state.isLoading;
  }

  get errors(): Error[] {
    return this.$store.state.errors;
  }

  get hasLocalStorage(): boolean {
    return window.localStorage.getItem('project') !== null;
  }
}
</script>

<style lang="scss" scoped>
.errors {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.chipview__container {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;	
  overflow: hidden;
  padding-bottom: 65px;
}

.project-loader {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  &__container {
    display: flex;
    flex-direction: column;

    h4 {
      margin: 0 0 15px 0;
    }

    &-buttons {
      display: flex;
      flex-direction: row;

      button {
        flex-grow: 1;
        margin: 0px 5px;

        &:first-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
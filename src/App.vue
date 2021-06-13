<template>
  <div id="app">
    <div v-show="isLoading" style="position: fixed; z-index: 1000; left:0;right:0;top:0;bottom:0; background-color:#000;opacity:0.8;">
      <div style="display: flex;width: 100%; height: 100%;align-items: center;justify-content: center;">
        <img src="@/assets/preloader.svg?data" />
      </div>
    </div>
    <tabs :tabs="['Периферия', 'Clock', 'Настройки проекта']" v-if="isProjectLoaded">
        <template slot="Периферия">
          <split-pane :min-percent='20' :default-percent='40' split="vertical">
            <template slot="paneL">
              <split-pane :min-percent='30' :default-percent='60' split="vertical">
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
        <template slot="Clock">WIP</template>
        <template slot="Настройки проекта">
          <ProjectSettingsView />
        </template>
    </tabs>
    <div class="project-loader" v-else>
      <div class="project-loader__container">
        <h4>Выберите способ загрузки проекта:</h4>
        <div class="project-loader__container-buttons">
          <button @click="loadFromSketch">Новый</button>
          <button disabled>Из файла</button>
          <button @click="loadFromLocalStorage">Из localstorage</button>
        </div>
      </div>
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

import Tabs from './components/tabs/Tabs.vue';
import VueStrong from '@/vueStrong';
import { ProjectActions, ProjectMutations } from './store/types';
import axios from 'axios';

@Component({
  components: {
    ChipView,
    PeripheryList,
    PeripheryProperties,
    Tabs,
    ProjectSettingsView
  },
})
export default class App extends VueStrong {
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
  }

  loadFromSketch(): void {
    this.$store.dispatch(ProjectActions.LOAD_PROJECT, 'none');
  }

  loadFromLocalStorage(): void {
    this.$store.dispatch(ProjectActions.LOAD_PROJECT, 'localstorage');
  }

  get isProjectLoaded(): boolean {
    return this.$store.state.isProjectLoaded;
  }
  
  get isLoading(): boolean {
    console.log(this.$store.state.isLoading);
    return this.$store.state.isLoading;
  }
}
</script>

<style lang="scss" scoped>
.chipview__container {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;	
  overflow: hidden;
  padding-bottom: 102px;
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
        height: 35px;
        flex-grow: 1;
      }
    }
  }
}
</style>
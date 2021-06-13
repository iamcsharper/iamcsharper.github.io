<template>
  <div>
    <h2>Настройки проекта</h2>
    <p>Текущая версия: <b>{{ currentVersion }}</b></p>
    Название проекта: <input v-model="projectName" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { ProjectActions, ProjectMutations } from '@/store/types';
import VueStrong from '@/vueStrong';

@Component
export default class ProjectSettingsView extends VueStrong {
  get projectName(): string {
    return this.$store.state.projectName;
  }

  set projectName(val: string) {
    this.$store.commit(ProjectMutations.SET_PROJECT_NAME, val);
  }

  get currentVersion(): string {
    return this.$store.state.counter + '';
  }
}
</script>

<style lang="scss" scoped>

</style>
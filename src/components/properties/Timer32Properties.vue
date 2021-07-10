<template>
  <div class="timer32props">
    <tabs 
      :tabs="tabNames"
      :isFixed="false"
      :hasContent="false"
      :onTabSelected="onTabSelected"
    />
    <div class="form-control">
      <label>Top</label>
      <input
        type="number"
        step="1"
        :value="timers[selected].top"
        @input="changeTimer(selected, {top: $event.target.value})"
      />
    </div>
    <div class="form-control">
      <label>Prescaler</label>
      <input
        type="number"
        step="1"
        :value="timers[selected].prescaler"
        @input="changeTimer(selected, {prescaler: $event.target.value})"
      />
    </div>
    <div class="form-control">
      <label>Count mode</label>
      <multiselect
        :value="timers[selected].countMode"
        :searchable="false"
        :close-on-select="true"
        :show-labels="false"
        placeholder="Select count mode"
        :options="countModes"
        @select="changeTimer(selected, {countMode: $event})"
      />
    </div>
    <div class="form-control">
      <label>Clock source</label>
      <multiselect
        :value="timers[selected].clockSource"
        :searchable="false"
        :close-on-select="true"
        :show-labels="false"
        placeholder="Select clock source"
        :options="clockSources"
        @select="changeTimer(selected, {clockSource: $event})"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.form-control {
  display: block;
  margin-bottom: 4px;

  input {
    display: block;
    width: 100%;
    padding: 5px 10px;
  }
}
</style>
<script lang="ts">
import VueStrong from '@/vueStrong';
import { Component, Prop, Vue } from 'vue-property-decorator';

import {ClockSource, CountMode, Timer, timersCount} from '@/store/timer32/types';

import Tabs from '@/components/tabs/Tabs.vue';
import Multiselect from 'vue-multiselect';
import { Timer32Mutations } from '@/store/timer32/mutations';

@Component({
  components: {
    Tabs,
    Multiselect,
  },
})
export default class Timer32Properties extends VueStrong {

  get countModes(): string[] {
    return Object.keys(CountMode);
  }

  get clockSources(): string[] {
    return Object.keys(ClockSource);
  }

  get tabNames(): string[] {
    return [...Array(timersCount).keys()].map(e=>`Timer32_${e}`);
  }

  selected = 0;

  constructor() {
    super();
  }

  get timers(): Timer[] {
    console.log(this.$store.state);
    return this.$store.state.timer32.timers;
  }

  changeTimer(index: number, data: Partial<Timer>): void {
    if (data.top) {
      data.top = Math.floor(data.top);
    }
    if (data.prescaler) {
      data.prescaler = Math.floor(data.prescaler);
    }

    this.$store.commit(Timer32Mutations.CHANGE_TIMER_DATA, {
      data: {
        ...data,
        isConfigured: true,
      },
      index,
    });
  }

  onTabSelected(i: number): void {
    this.selected = i;
  }
}
</script>

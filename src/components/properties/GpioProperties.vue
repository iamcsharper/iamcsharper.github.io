<template>
  <div class="wrap-table100">
    <main class="table">
      <aside class="row header">
        <div class="cell">Name</div>
        <div class="cell">Direction</div>
        <div class="cell">IntMode</div>
        <div class="cell">Line</div>
      </aside>
      <aside class="row" v-for="(config,index) in configs" :key="index">
        <div class="cell" data-title="Name">{{ config.name }}</div>
        <div class="cell" data-title="Direction">{{ config.direction }}</div>
        <div class="cell" data-title="IntMode">{{ config.intMode }}</div>
        <div class="cell" data-title="Line">{{ config.line }}</div>
      </aside>
    </main>
  </div>
</template>

<script lang="ts">
import { Direction, GpioMutations, GpioPinConfig, IntMode, Line } from '@/store/gpio/types';
import { AugmentedProjectState } from '@/store/types';
import VueStrong from '@/vueStrong';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class GpioProperties extends VueStrong {
  constructor() {
    super();
  }

  mounted(): void {
    const state = this.$store.state as AugmentedProjectState;

    console.log(this.$store, state.gpio);

    // state.gpio.configs.push({
    //   name: 'test_0_2',
    //   direction: Direction.Input,
    //   intMode: IntMode.Int_Rising,
    //   line: Line.Line_2
    // });

    // state.gpio.configs = [...state.gpio.configs]; 
  }

  get configs(): GpioPinConfig[] {
    const state = this.$store.state as AugmentedProjectState;

    return state.gpio.configs;
  }
}
</script>

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
        <div class="cell" data-title="Name">
          {{ config.name }}
        </div>
        <div class="cell" data-title="Direction">
          <multiselect
            :value="config.direction"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Pick a direction"
            @select="changeConfig(index, {direction: $event})"
            :options="directions" />
        </div>
        <div class="cell" data-title="IntMode">
          <multiselect
            :value="config.intMode"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Pick IntMode"
            @select="changeConfig(index, {intMode: $event})"
            :options="intModes" />
        </div>
        <div class="cell" data-title="Line">
          <multiselect
            :disabled="config.intMode === IntMode.None"
            class="line-select"
            :class="{'line-select--duplicate': isDuplicateLine(index)}"
            :value="config.line"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Pick Line"
            @select="changeConfig(index, {line: $event})"
            :options="(config.num_in_port!==null) ? getLineOptions(config.num_in_port) : []" />
          <small v-if="isDuplicateLine(index)">
            Линии не должны повторяться
          </small>
        </div>
      </aside>
    </main>
  </div>
</template>
<style lang="scss">


.line-select {
  transition: all .2s ease-in-out;
  &--duplicate {
    color: #fff;
    font-weight: bold;
    .multiselect__tags, .multiselect__single {
      background: $danger-color;   
    }
    .multiselect__select:before {
      color: #fff;
      border-top-color: #fff;
    }
  }
}
</style>
<script lang="ts">
import Multiselect from 'vue-multiselect';
import { Direction, GpioMutations, GpioPinConfig, IntMode, Line } from '@/store/gpio/types';
import { AugmentedProjectState } from '@/store/types';
import VueStrong from '@/vueStrong';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Multiselect,
  },
})
export default class GpioProperties extends VueStrong {
  IntMode = IntMode;

  constructor() {
    super();
  }

  isDuplicateLine(index: number): boolean {
    const config = this.configs[index];

    if (config.intMode === IntMode.None) 
      return false;

    return this.configs.some(e => (
      e.line === config.line &&
      e.pin !== config.pin &&
      e.intMode !== IntMode.None
    ));
  }

  changeConfig(index: number, config: Partial<GpioPinConfig>): void {
    this.$store.commit(GpioMutations.CHANGE_CONFIG_DATA, {
      data: config,
      index,
    });
  }

  get directions(): string[] {
    return Object.values(Direction);
  }

  get intModes(): string[] {
    return Object.values(IntMode);
  }

  getLineOptions(N: number): string[] {
    return [N % 8, (N+4) % 8].map(e => 'Line_' + e);
  }

  get configs(): GpioPinConfig[] {
    return this.$store.state.gpio.configs;
  }
}
</script>

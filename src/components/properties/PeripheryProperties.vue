<template>
  <div>
    <h4>Настройки периферии</h4>
    <gpio v-if="selectedPeripheral === Peripherals.GPIO"/>
    <timer-32 v-if="selectedPeripheral === Peripherals.TIMER32"/>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

import { Peripherals } from '@/shared/peripherals';

import Gpio from '@/components/properties/GpioProperties.vue';
import Timer32 from '@/components/properties/Timer32Properties.vue';
import VueStrong from '@/vueStrong';

@Component({
  components: {
    Gpio,
    Timer32
  },
})
export default class PeripheryList extends VueStrong {
  public Peripherals = Peripherals;
  
  get selectedPeripheral(): Peripherals {
    return this.$store.state.selectedPeripheral;
  }

  constructor() {
    super();
  }
}
</script>
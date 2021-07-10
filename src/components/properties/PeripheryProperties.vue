<template>
  <div>
    <h4>Настройки периферии</h4>
    <transition name="fade" mode="out-in">
      <component :is="comp"></component>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">

import { Component } from 'vue-property-decorator';

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
  
  get comp(): typeof VueStrong | null {
    const p = this.$store.state.selectedPeripheral;

    switch (p) {
      case Peripherals.GPIO:
        return Gpio;
      case Peripherals.TIMER32:
        return Timer32;
    }

    return null;
  }

  constructor() {
    super();
  }
}
</script>
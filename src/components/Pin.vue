<template>
  <div class="chipview__pin">
    <button
    class="btn"
    style="width: 100%"
    :style="{
      height: `${height}px`,
    }"
    :class="{
      'active': storePin.selectedMode !== null
    }"
    :disabled="storePin.modes.length <= 1"
    @click="pin_click_handler($event, pin.id, col_id)">
    <span>{{ storePin.name }}</span>
    <div
    class="badges"
    :class="{
      'badges--opposite': col_id === 2 && rotation === 0 || col_id === 3
    }"
    v-show="storePin.selectedMode !== null">
      {{ storePin.selectedMode !== null ? storePin.modes[storePin.selectedMode].sign : '' }}
    </div>
    </button>
  </div>
</template>

<script lang="ts">
import VueStrong from '@/vueStrong';
import IPin from '@/shared/interfaces/Pin';
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { Pin } from '@/store/types';

@Component
export default class ChipView extends VueStrong {
    @Prop() private pin!: IPin;
    @Prop() private height!: number;
    @Prop() private col_id!: number;
    @Prop() private rotation!: number;

    get storePin(): Pin {
      return this.$store.state.pinout[this.pin.id];
    }

    @Inject('pin_click_handler') private pin_click_handler!: (event: Event, pin_id: number, col_id: number)=>void;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.chipview__pin {
  position: relative;
  width: 100%;
  // height: 25px;
  button {
    padding: 0;
    &.active {
      background: #52b36f;
    }
    
    .badges {
      position: absolute;
      left: -120px;
      top: 3px;
      width: 110px;
      text-align: right;

      &--opposite {
        left: unset;
        right: -120px;
        text-align: left;
      }
    }
  }
}
</style>
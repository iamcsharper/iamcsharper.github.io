<template>
  <div class="chipview__pin">
    <button style="width: 100%" :style="{
      height: `${height}px`,
    }" @click="pin_click_handler($event, pin.id, col_id)">{{pin.name}}</button>
  </div>
</template>

<script lang="ts">
import VueStrong from '@/vueStrong';
import IPin from '@/shared/interfaces/Pin';
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';

@Component
export default class ChipView extends VueStrong {
    @Prop() private pin!: IPin;
    @Prop() private height!: number;
    @Prop() private col_id!: number;

    @Inject('pin_click_handler') private pin_click_handler!: (event: Event, pin_id: number, col_id: number)=>void;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.chipview__pin {
  width: 100%;
  // height: 25px;
}
</style>
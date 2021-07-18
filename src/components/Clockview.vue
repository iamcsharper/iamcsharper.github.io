<template>
  <div style="overflow: hidden; position: relative; user-select: none;display: flex;align-items: center;justify-content: center;">
      <div ref="wrapper" :style="computedStyle" style="position: relative;">
        <div class="clock-control" style="left: 530px; bottom: 450px;">
          <label>Поле для ввода</label>
          <input />
        </div>
        <div class="clock-control" style="left: 530px; top: 240px;">
          <label>Галочка</label>
          <v-checkbox
            :isDark="false"
          />
        </div>
        <img
          ref="img"
          :src="computedSrc"
          style="height: 100%;display:block;user-select: none"
          v-drag="this.onDragged"
        />
      </div>
  </div>
</template>
<style lang="scss">
.clock-control {
  background: rgba(255,255,255,0.7);
  position: absolute;
  display: flex;
  flex-direction: column;

  label, input {
    display: block;
  }
}
</style>
<script lang="ts">
import { Component, Ref } from 'vue-property-decorator';
import VueStrong from '@/vueStrong';
import { ProjectActions, ProjectMutations } from '@/store/types';

import VCheckbox from '@/components/standart/VCheckbox.vue';

import { clockSvg } from '@/config/links';
import { DragData } from '@/shared/directives/v-drag';
import { constrain } from '@/shared/helpers';

@Component({
  components: {
    VCheckbox,
  },
})
export default class ClockView extends VueStrong {

  @Ref('wrapper') readonly wrapper!: HTMLDivElement;
  @Ref('img') readonly img!: HTMLImageElement;

  private scale = 1;

  private pos = {
    x: 0,
    y: 0
  };

  onDragged({
    hasMoved,
    deltaX,
    deltaY
  }: DragData): void {
    if (!hasMoved) return;

    this.pos.x += deltaX;
    this.pos.y += deltaY;
  }

  mounted():void {
    this.wrapper.addEventListener('wheel', this.onWheel);
  }

  beforeDestroy():void {
    this.wrapper.removeEventListener('wheel', this.onWheel); 
  }

  onWheel(event: WheelEvent):void {
    this.scale -= event.deltaY / 1250.0;
    this.scale = constrain(0.5, 1.7, this.scale);

    this.$forceUpdate();
  }

  get isSvgLoaded(): boolean {
    return !!this.$store.state.clockSvg && !!this.$store.state.clockSvg.length;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  get computedSrc(): string {
    return clockSvg;
  }

  get computedStyle(): Record<string, unknown> {
    const { width, height }= this.img?.getBoundingClientRect() || {};
    // translate(${this.pos.x}px, ${this.pos.y}px)
    return {
      transform: `translate(${this.pos.x}px, ${this.pos.y}px) scale(${this.scale})`
    };
  }
}
</script>

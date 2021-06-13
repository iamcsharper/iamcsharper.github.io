<template>
  <div ref="container" class="dropbox" :class="{
    'dropbox--fixed': mode === DropboxMode.Fixed,
    'dropbox--hidden': is_hidden
  }" :style="style">
    <div class="dropbox__option">Опция 1</div>
    <div class="dropbox__option">Опция 2</div>
  </div>
</template>

<script lang="ts">
import VueStrong from '@/vueStrong';
import XandY from '@/shared/interfaces/XandY';
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
export enum DropboxMode {
  // eslint-disable-next-line no-unused-vars
  Normal,
  // eslint-disable-next-line no-unused-vars
  Fixed
}

export enum DropboxPivot {
  TopRight,
  TopLeft,
  BottomRight,
  BottomLeft
}

@Component
export default class Dropbox extends VueStrong {
  @Prop({required:true}) private mode!: DropboxMode;
  @Prop({required:true}) private pivot!: DropboxPivot;

  @Prop({required:true}) private pos!: XandY; 

  @Ref('container') readonly container!: HTMLDivElement;

  @Prop() private is_hidden!: boolean;

  constructor() {
    super();
  }

  public DropboxMode = DropboxMode;

  public isMounted = false;

  mounted(): void {
    this.isMounted = true;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  get style(): object {
    if (this.mode === DropboxMode.Normal) {
      return {};
    }

    let offsetLeft = 0;
    let offsetTop = 0;

    if (this.isMounted) {
      const computedStyle = window.getComputedStyle(this.container);

      const w = parseInt(computedStyle.width);
      const h = parseInt(computedStyle.height);

      if (this.pivot === DropboxPivot.TopRight 
      || this.pivot === DropboxPivot.BottomRight) {
        offsetLeft -= w;
      } 
      if (this.pivot === DropboxPivot.BottomRight
      || this.pivot === DropboxPivot.BottomLeft) {
        offsetTop -= h;
      }
    }

    return {
      left: (this.pos.x+offsetLeft)+'px',
      top: (this.pos.y+offsetTop)+'px',
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dropbox {
  background: #fff;
  border: 1px solid rgba(0,0,0,.15);

  &__option {
    color: #212529;
    cursor: pointer;
    padding: 3px 14px;

    &:not(:last-of-type) {
      border-bottom: 1px solid rgba(0,0,0,0.2);
    }

    &:hover {
      color: #1e2125;
      background: #e9ecef
    }
  }

  &--fixed {
    position: fixed;
  }

  &--hidden {
    visibility: hidden;
    pointer-events: none;
  }
}
</style>
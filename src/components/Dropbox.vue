<template>
  <div ref="container" class="dropbox" :class="{
    'dropbox--fixed': mode === DropboxMode.Fixed,
    'dropbox--hidden': is_hidden
  }" :style="style">
    <div
    class='dropbox__option'
    :class="{
      'dropbox__option--selected': selected.includes(i)
    }"
    @click="onOptionSelected(i, option)"
    v-for="(option,i) in options"
    :key="i"
    :value="option.value">
    {{ option.text }}
    </div>
  </div>
</template>

<script lang="ts">
import VueStrong from '@/vueStrong';
import XandY from '@/shared/interfaces/XandY';
import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator';
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

export interface DropboxOption {
  text: string;
  value: any;
}

export type OptionChangeHandler = (i: number, option: DropboxOption)=>void;

@Component
export default class Dropbox extends VueStrong {
  @Prop({required:true}) private mode!: DropboxMode;
  @Prop({required:true}) private pivot!: DropboxPivot;

  @Prop({required:true}) private pos!: XandY; 

  @Prop({required:true}) private options!: DropboxOption[]; 

  @Ref('container') readonly container!: HTMLDivElement;

  @Prop() private is_hidden!: boolean;

  @Prop({default: ()=>[]}) private selected!: number[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({default: (a:number,b:DropboxOption)=>{}}) private onOptionSelected!: OptionChangeHandler;

  constructor() {
    super();
  }

  public DropboxMode = DropboxMode;

  public isMounted = false;

  mounted(): void {
    this.isMounted = true;
  }

  public w = 0;
  public h = 0;

  updated():void {
    if (this.mode === DropboxMode.Normal) {
      return; 
    }

    const computedStyle = window.getComputedStyle(this.container);

    const w = parseInt(computedStyle.width);
    const h = parseInt(computedStyle.height);

    if (this.w != w || this.h != h) {
      this.w = w;
      this.h = h;
    }
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

      this.w = parseInt(computedStyle.width);
      this.h = parseInt(computedStyle.height);

      if (this.pivot === DropboxPivot.TopRight 
      || this.pivot === DropboxPivot.BottomRight) {
        offsetLeft -= this.w;
      } 
      if (this.pivot === DropboxPivot.BottomRight
      || this.pivot === DropboxPivot.BottomLeft) {
        offsetTop -= this.h;
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
  z-index: 2;

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

    &--selected {
      background: #7952b3;
      color: #fff;

      &:hover {
        background: #674796;
        color: #fff;
      }
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
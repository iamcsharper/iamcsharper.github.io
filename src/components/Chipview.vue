<template>
  <div ref="chipview_container_borders" v-click-outside="onClickOutside">
    <dropbox
      :mode="DropboxMode.Fixed"
      :pos="dropboxPos"
      :pivot="pivot"
      :is_hidden="dropbox_hidden"
      :options="dropbox_options"
      :selected="selected_options"
      :onOptionSelected="onOptionSelected"
      />
    <div class="zoom_picker__container">
      <aside class="zoom_picker__container-info">
        <span>{{ projectName }}</span><span>MIK32</span><span>QFP64</span>
        <span v-if="shouldSaySaved">СОХРАНЕНО😊</span>
        <button class="button" @click="saveProject()">Сохранить проект</button>
        <button class="button" @click="generate()">Сгенерировать</button>
      </aside>
      <input type="range" v-model="zoom" min="0.3" max="1.7" step="0.05">
      <button class="button button-danger" @click="resetView">Сброс</button>
    </div>
    <div class="chipview__holder" :style="{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`
      }">
      <div class="chipview__holder-body" :style="{
        width: `${footprint.packageWidth(0)*2}px`,
        height: `${footprint.packageWidth(1)*2}px`,
        left: `-${footprint.packageWidth(0)}px`,
        top: `-${footprint.packageWidth(1)}px`,
      }" v-drag="onDragged">MIK32<br>{{footprint.name}}</div>
      <pin-column
        v-for="(col,i) in cols"
        :key="i"
        :col_id="i"
        :pins="col.pins"
        :param_left="col.left"
        :param_top="col.top"
        :rotation="col.rotation"
        :pin_width="footprint.btnWidth"
        :pin_height="footprint.btnHeight"
        >
      </pin-column>
      <!-- <pin-column :pins="pins"></pin-column> -->
    </div>
  </div>
</template>

<script lang="ts">
import XandY from "@/shared/interfaces/XandY"
import { Component/*, Prop*/, Vue, Ref, Provide } from 'vue-property-decorator';
import { DragData } from '@/shared/directives/v-drag';

import Dropbox, {DropboxMode,DropboxOption,DropboxPivot, OptionChangeHandler} from './Dropbox.vue';
import PinColumn from './PinColumn.vue';
import { ProjectState, ProjectActions, ProjectMutations } from "@/store/types";
import VueStrong from '@/vueStrong';
import { MyMutationPayload } from "@/store";

import {dip16, FootprintData, qfp64} from '@/shared/footprints';
import {ICol, generateCols} from '@/shared/generateCols';

import {chipviewDropboxHandle} from '@/shared/chipviewDropboxHandle';
import { constrain } from "@/shared/helpers";

@Component({
  components: {
    PinColumn,
    Dropbox
  },
})
export default class ChipView extends VueStrong {
  public DropboxMode = DropboxMode;
  public dropboxPos: XandY = {x:-100,y:-100};
  public pivot = DropboxPivot.TopLeft;
  public dropbox_hidden = true;
  public selected_pin_id = -1;
  
  get selected_options(): number[] {
    if (this.selected_pin_id === -1) return [];

    const selected = this.$store.state.pinout[this.selected_pin_id].selectedMode;

    if (selected === null) return [];

    return [ selected ];
  }
  public dropbox_options:DropboxOption[] = []; 

  // TODO: load from vuex
  public footprint: FootprintData = qfp64;

  get cols(): ICol[] {
    return generateCols(this.footprint);
  }

  @Ref('chipview_container_borders') readonly borders!: HTMLDivElement;

  public isMounted = false;

  public zoom = 1;

  public offset: XandY = {
    x: 0,
    y: 0
  }

  get projectName(): string {
    return this.$store.state.projectName;
  }

  resetView():void {
    this.offset.x = 0;
    this.offset.y = 0;

    this.zoom = 1;
  }

  saveProject(): void {
    this.$store.dispatch(ProjectActions.SAVE_PROJECT, 'localstorage');
  }

  generate(): void {
    this.$store.dispatch(ProjectActions.SAVE_PROJECT, 'file');
  }

  public onOptionSelected(i: number, option: DropboxOption):void {
    let pin = this.$store.state.pinout[this.selected_pin_id];

    let isActivated;

    if (pin.selectedMode == option.value) {
      pin.selectedMode = null;
      isActivated = false;
    } else {
      pin.selectedMode = option.value;
      isActivated = true;
    }

    this.$store.commit(ProjectMutations.CHANGE_PIN_DATA, pin);

    chipviewDropboxHandle(this.$store, pin, isActivated);
  }

  //todo typed arg
  @Provide('pin_click_handler')
  public pinClickHandler (event: Event, id: number, col: number):void {
    const pin = this.$store.state.pinout[id];
    this.selected_pin_id = id;

    let btn = event.target as HTMLButtonElement;

    if (!btn.classList.contains('btn'))
      btn = btn.parentElement as HTMLButtonElement;

    let {left, top, width, height} = btn.getBoundingClientRect();

    if (col === 0) {
      this.pivot = DropboxPivot.TopRight;
    } else if (col === 1) {
      this.pivot = DropboxPivot.TopLeft;
      top += height;
    } else if (col === 2) {
      this.pivot = DropboxPivot.TopLeft;
      left += width;
    } else if (col === 3) {
      this.pivot = DropboxPivot.BottomLeft;
    }

    this.dropbox_hidden = false;
    this.dropboxPos.x = left;
    this.dropboxPos.y = top;
    
    const modes = pin.modes;

    this.dropbox_options = modes.map((e,i)=>{
      return {
        text: e.sign,
        value: i
      }
    });
  }

  public onClickOutside():void {
    this.dropbox_hidden = true;
  }

  public readonly wheelHandler = (evt: Event):void => this.onWheel(evt as WheelEvent);

  public shouldSaySaved = false;
  public savedInfoTimer: number|null = null;

  mounted():void {
    this.isMounted = true;
    this.zoom = 1;

    window.addEventListener('mousewheel', this.wheelHandler);

    this.$store.subscribe<MyMutationPayload>((mutation, state) => {
      if (mutation.type === ProjectMutations.INCREMENT_VERSION) {
        console.log(mutation.type, mutation.payload, state); 

        this.shouldSaySaved = true;

        if (this.savedInfoTimer) clearTimeout(this.savedInfoTimer);

        this.savedInfoTimer = setTimeout(()=>{
          this.shouldSaySaved = false;
        }, 2000);
      }
    });
  }

  onWheel(evt: WheelEvent):void {
    if (!this.$el.parentElement) return;
    const {x,y,width,height} = this.$el.parentElement.getBoundingClientRect();
    
    if (evt.pageX < x || evt.pageX > x + width) return;
    if (evt.pageY < y || evt.pageY > y + height) return;

    this.zoom -= evt.deltaY/125 * 0.05;

    this.zoom = constrain(0.5, 1.7, this.zoom);

    this.dropbox_hidden = true;
  }

  destroyed():void {
    window.removeEventListener('mousewheel', this.wheelHandler);
  }

  public isDragging = false;

  // Bounds

  // zoom=1.2, x min = -76
  // zoom=0.7 x min = -321

  onDragged({
    el,
    hasMoved,
    isDragging,
    deltaX,
    deltaY
  }: DragData): void {
    this.isDragging = isDragging;

    if (!hasMoved) {
      return;
    }

    this.offset.x += deltaX;
    this.offset.y += deltaY;  

    this.dropbox_hidden = true;
  }

  constructor() {
    super();

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.chipview__holder {
  position: relative;

  &-body {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #d2d2d2;
    font-size: 2rem;
    user-select: none;

    &:active {
      cursor: move;
    }
  }
}
.zoom_picker__container {
  position: absolute;
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  left: 0;
  bottom: 0; 
  z-index: 2;
  background: #ececec;

  &-info {
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button:not(:last-of-type) {
      margin-right: 4px;
    }

    span {
      margin-right: 4px;
    }

    span::after {
      margin-left: 4px;
      content: '/';
    }

    span:last-of-type::after{
      content: '';
    }
  }
}
</style>
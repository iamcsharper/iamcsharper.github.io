<template>
  <div class="timer32props">
    <tabs 
      :tabs="tabNames"
      :isFixed="false"
      :hasContent="false"
      :onTabSelected="(i) => selected = i"
      :style="{marginBottom: '10px'}"
    />
    <div class="form" :class="{'form-animating': isAnimating}">
      <div class="form-control">
        <label>Enabled?</label>
        <div>
          <v-checkbox
            :isDark="true"
            :checked="timers[selected].isEnable"
            @input="changeTimer(selected, {isEnable: $event})"
          />
        </div>
      </div>
      <div class="form-control">
        <label>Top</label>
        <input
          type="number"
          step="1"
          min="0"
          max="16"
          :value="timers[selected].top"
          @input="changeTimer(selected, {top: $event.target.value})"
        />
      </div>
      <div class="form-control">
        <label>Prescaler</label>
        <input
          type="number"
          step="1"
          :value="timers[selected].prescaler"
          @input="changeTimer(selected, {prescaler: $event.target.value})"
        />
      </div>
      <div class="form-control">
        <label>Count mode</label>
        <multiselect
          :value="timers[selected].countMode"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select count mode"
          :options="countModes"
          @select="changeTimer(selected, {countMode: $event})"
        />
      </div>
      <div class="form-control">
        <label>Clock source</label>
        <multiselect
          :value="timers[selected].clockSource"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select clock source"
          :options="clockSources"
          @select="changeTimer(selected, {clockSource: $event})"
        />
      </div>
      <div class="form-control">
        <label>Int mode</label>
        <multiselect
          :value="timers[selected].intMode"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select int mode"
          :options="intModes"
          @select="changeTimer(selected, {intMode: $event})"
        />
      </div>
      <div v-for="(ch, i) in timers[selected].channels" :key="i" style="margin-bottom: 20px">
        <div class="form-divider"></div>
        <div class="form-control">
          <label>CH{{i+1}} Mode</label>
          <multiselect
            :value="ch.mode"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            :placeholder="`Select ch${i+1} mode`"
            :options="chModes"
            @select="changeTimerChannel(selected, i, {mode: $event})"
          />
        </div>
        <div v-if="ch.mode !== CHMode.Disable" :key="`extras-${i}`">
          <div class="form-control">
            <label>Noise Filter</label>
            <div>
              <v-checkbox
                :isDark="true"
                :checked="ch.noiseFilter"
                @input="changeTimerChannel(selected, i, {noiseFilter: $event})"
              />
            </div>
          </div>
          <div class="form-control">
            <label>Compare Value</label>
            <input
              type="number"
              step="1"
              :value="ch.compareValue"
              @input="changeTimerChannel(selected, i, {compareValue: $event.target.value})"
            />
          </div>
          <div class="form-control">
            <label>Capture Value</label>
            <input
              type="number"
              step="1"
              :value="ch.captureValue"
              @input="changeTimerChannel(selected, i, {captureValue: $event.target.value})"
            />
          </div>
          <div class="form-control">
            <label>Capture Edge</label>
            <multiselect
              :value="ch.captureEdge"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              :placeholder="`Select ch${i+1} edge`"
              :options="captureEdges"
              @select="changeTimerChannel(selected, i, {captureEdge: $event})"
            />
          </div>
          <div class="form-control">
            <label>PWM Inverted</label>
            <v-checkbox
              :isDark="true"
              :checked="ch.pwmInverted"
              @input="changeTimerChannel(selected, i, {pwmInverted: $event})"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import VueStrong from '@/vueStrong';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import {CaptureEdge, CHMode, ClockSource, CountMode, Timer, TimerChannel, TimerIntMode, timersCount} from '@/store/timer32/types';

import Tabs from '@/components/standart/Tabs.vue';
import VCheckbox from '@/components/standart/VCheckbox.vue';
import Multiselect from 'vue-multiselect';
import { Timer32Mutations } from '@/store/timer32/mutations';

@Component({
  components: {
    Tabs,
    VCheckbox,
    Multiselect,
  },
})
export default class Timer32Properties extends VueStrong {

  get countModes(): string[] {
    return Object.keys(CountMode);
  }

  get clockSources(): string[] {
    return Object.keys(ClockSource);
  }

  get intModes(): string[] {
    return Object.keys(TimerIntMode);
  }

  get chModes(): string[] {
    return Object.keys(CHMode);
  }

  get captureEdges(): string[] {
    return Object.keys(CaptureEdge);
  }

  get tabNames(): string[] {
    return [...Array(timersCount).keys()].map(e=>`Timer32_${e}`);
  }

  public CHMode = CHMode;

  selected = 0;

  isAnimating = false;
  animTimer: number|null = null;

  @Watch('selected')
  onSelectedChange():void {
    if (this.animTimer !== null) return;

    this.isAnimating = true;
    this.animTimer = setTimeout(()=>{
      this.isAnimating = false;
      this.animTimer = null;
    }, 150);
  }

  constructor() {
    super();
  }

  get timers(): Timer[] {
    console.log(this.$store.state);
    return this.$store.state.timer32.timers;
  }

  changeTimerChannel(timer: number, channel: number, data: Partial<TimerChannel>): void {
    const channels = this.$store.state.timer32.timers[timer].channels.map((e,i)=>{
      if (i === channel) {
        return {
          ...e,
          ...data,
        };
      }
      return { ...e };
    });

    this.$store.commit(Timer32Mutations.CHANGE_TIMER_DATA, {
      data: {
        channels,
      },
      index: timer,
    });
  }

  changeTimer(index: number, data: Partial<Timer>): void {
    if (data.top) {
      data.top = Math.floor(data.top);
    }
    if (data.prescaler) {
      data.prescaler = Math.floor(data.prescaler);
    }

    this.$store.commit(Timer32Mutations.CHANGE_TIMER_DATA, {
      data: {
        ...data,
      },
      index,
    });
  }
}
</script>

<style lang="scss" scoped>
.form{
  max-width: 75%;
  margin-left: 10px;
  opacity: 1;
  transition: opacity .15s ease;
  &-animating {
    opacity: 0;
  }
  &-divider {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 2px;
    width: 100%;
    background: lighten($gray-second, 20%);
  }
  &-control {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    label {
      // flex-basis: 50%;
      font-size: 1rem;
    }

    input, div {
      flex-basis: 60%;
    }

    input {
      display: block;
      width: calc(100% - 8px);
      padding: 10px 10px;
    }
  }
}

</style>
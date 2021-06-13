<template>
  <div>
    <h4>Список периферии:</h4>
    <ul>
      <li
      v-for="periphery in Peripherals"
      :key="periphery"
      :class="{active: getIsActive(periphery)}"
      @click="selectPeriphery(periphery)">{{ periphery }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  ul {
    li {
      display: block;
      padding: 10px 5px;
      background: rgb(196, 196, 196);
      color: black;
      margin-bottom: 5px;
      cursor: pointer;

      &:hover {
        background: #dadada;
      }

      &.active {
        padding-left: 15px;
        border-left: 5px solid rgba(0,0,0,0.5);
        background: #7952b3;
        color: #fff;
      }
    }
  }
</style>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

import { Peripherals } from '@/shared/peripherals';
import VueStrong from '@/vueStrong';
import { ProjectMutations } from '@/store/types';

@Component({
  components: {
  },
})
export default class PeripheryList extends VueStrong {
  public Peripherals = Peripherals;

  selectPeriphery(periphery: string):void {
    this.$store.commit(ProjectMutations.SET_SELECTED_PERIPHERAL, periphery as Peripherals);
  }

  getIsActive(periphery: string):boolean {
    return this.$store.state.selectedPeripheral === (periphery as Peripherals);
  }
}
</script>
<template>
  <div class="tabs__light">
    <ul class='tabs__header' v-if="tabs.length">
      <li
      v-for='(tab,index) in tabs'
      :key='tab'
      @click='selectTab(index)'
      :class='{"tab__selected": (index == selectedIndex)}'>
        {{ tab }} 
      </li>
    </ul>
    <div 
    class="tab"
    v-for="(tabName, index) in tabs"
    :key="tabName"
    :ref="`tab-${index}`">
      <slot :name="tabName"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import VueStrong from '@/vueStrong';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Tabs extends VueStrong {
  public selectedIndex = 0;

  @Prop(Array) tabs!: string[];

  mounted():void {
    this.selectTab(0)
  }

  selectTab (i: number):void {
    this.selectedIndex = i;

    for (let j = 0; j < this.tabs.length; j++) {
      const $ref = this.$refs[`tab-${j}`] as HTMLElement[];
      
      $ref[0].style.display = (j === i) ? 'block' : 'none';
    }
  }
}
</script>

<style lang="scss" scoped>
ul.tabs__header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
  background: #666;
}
ul.tabs__header > li {
  height: 48px;
  padding: 17px 30px;
  margin: 0;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
  color: #444;
  font-weight: bold;
  border-bottom: 2px solid transparent;

  &.tab__selected {
    color: black;
    background: #ddd;
    border-bottom: 2px solid #666;
  }
}
.tab {
  display: inline-block;
  color: black;
  min-width: 800px;
  min-height: 400px;
  height: 100%;
  padding-top: 50px;
}
.tabs__light {
  height: 100%;
}
.tabs__light li {
  background-color: #cacaca;
  color: #aaa;
}
</style>
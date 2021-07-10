<template>
  <div class="tabs__light">
    <ul
      class='tabs__header'
      :class="{'tabs__header--fixed': isFixed}"
      v-if="tabs.length">
      <li
        v-for='(tab,index) in tabs'
        :key='tab'
        :class='{"nav__selected": (index === selectedIndex)}'
        @click='selectTab(index)'
      >
        {{ tab }} 
      </li>
    </ul>
    <transition-group name="fade" mode="out-in" v-if="hasContent">
      <template v-for="(name, index) in tabs">
        <div class="tab" :key="name" v-if="index === selectedIndex">
          <slot :name="name"></slot>
        </div>
      </template>
    </transition-group>
  </div>
</template>
<script lang="ts">
import VueStrong from '@/vueStrong';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Tabs extends VueStrong {
  public selectedIndex = 0;

  @Prop(Array) tabs!: string[];
  @Prop(Function) onTabSelected!: (i: number) => void;
  @Prop({
    type: Boolean,
    default: true,
  }) isFixed!: boolean;
  @Prop({
    type: Boolean,
    default: true,
  }) hasContent!: boolean;

  mounted():void {
    this.selectTab(0)
  }

  selectTab (i: number):void {
    if (this.onTabSelected) {
      this.onTabSelected(i);
    }

    this.selectedIndex = i;
  }
}
</script>

<style lang="scss" scoped>
ul.tabs__header {
  display: flex;
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #868686;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
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

  &.nav__selected {
    color: black;
    background: #ddd;
    border-bottom: 4px solid rgba(0, 0, 0, 0.3);
    background: $active-color;
    color: $gray-top;
  }
}
.tab {
  display: block;
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
  background-color: #eaeaea;

  &:hover {
    background-color: #e5e5e5;
  }
}
</style>
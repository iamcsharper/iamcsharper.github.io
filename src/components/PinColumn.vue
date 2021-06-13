<template>
    <div class="chipview__absolute" :style="{
        left:`${param_left}px`,
        top:`${param_top}px`,
        transform: `rotate(${rotation}deg)`,
        width: `${pin_width}px`,
    }">
        <div class="chipview__pincolumn">
            <pin 
            v-for="(myPin, id) in pins"
            :key="id"
            :col_id="col_id"
            :pin="myPin"
            :height="pin_height"
            ></pin>
        </div>
    </div>
</template>

<script lang="ts">
import VueStrong from '@/vueStrong';
import Pin from './Pin.vue';
import IPin from '@/shared/interfaces/Pin';
import { Component, Prop, Vue } from 'vue-property-decorator';
import StrongVueClass from '@/vueStrong';

@Component({
  components: {
    Pin,
  },
})
export default class ChipView extends StrongVueClass {
    @Prop() private pins!: IPin[];
    @Prop() private col_id!: number;

    @Prop() private pin_width!: number;
    @Prop() private pin_height!: number;

    @Prop() private param_left!: number;
    @Prop() private param_top!: number;

    @Prop() private rotation!: number;

    constructor() {
        super();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.chipview__absolute {
    position: absolute;
}
.chipview__pincolumn {
    display: flex;
    flex-direction: column;
}
</style>
<template>
  <div>
    GPIO properties
  </div>
</template>

<script lang="ts">
import VueStrong from '@/vueStrong';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class GpioProperties extends VueStrong {

    constructor() {
        super();
    }
}
</script>

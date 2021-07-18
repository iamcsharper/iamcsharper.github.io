<template>
    <div class="v-checkbox" @click="invert()" :class="{
        'v-checkbox--dark': isDark,
        'v-checkbox--light': !isDark,
    }">
        <div
            class="v-checkbox-icon"
            :class="{'v-checkbox-icon--selected': isChecked}"
        ></div>
    </div>
</template>
<script lang="ts">
import VueStrong from '@/vueStrong';
import { Component, Vue, Prop, ModelSync, Watch } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class VCheckbox extends VueStrong {
    @Prop({
        type: Boolean,
        default: false
    })
    readonly isDark!: boolean;

    @ModelSync('checked', 'input', { type: Boolean, default: false }) checkedValue!: boolean

    public isChecked = false;

    mounted():void {
        this.isChecked = this.checkedValue;   
    }

    @Watch('checkedValue')
    onPropChanged(val: boolean):void {
        this.isChecked = val;
    }

    invert(): void {
        this.isChecked = !this.isChecked;
        this.checkedValue = this.isChecked;
    }
}
</script>
<style lang="scss">
.v-checkbox {
    display: inline-block;
    width: fit-content;
    position: relative;
    cursor: pointer;
    user-select: none;

    &-block {
        width: 100%;
    }

    &:active {
        transform: scale(1.05);
    }

    &-icon {
        position: relative;
        height: 25px;
        width: 25px;
        border-radius: 4px;
        overflow: hidden;

        &:before {
            position: absolute;
            content: "";
            left: 7px;
            top: 0px;
            width: 9px;
            height: 18px;
            opacity: 0;
            border-style: solid;
            border-width: 0 3px 3px 0;
            transform: scale(0.2) rotate(45deg);
            transition: opacity .2s ease-in, transform .4s ease;
        }

        &--selected:before {
            opacity: 1;
            transform: scale(1) rotate(45deg);
        }
    }

    &--light {
        .v-checkbox-icon {
            background-color: $gray-second;
            border: 2px solid darken($gray-second, 5%);

            &:hover {
                background: lighten($gray-second, 5%);
                border: 2px solid $gray-second;
            }

            &:before {
                border-color: $gray-top;
            }
        }
    }

    &--dark {
        .v-checkbox-icon {
            background-color: transparent;
            border: 2px solid #000;

            &:hover {
                background: $gray-top;
                border: 2px solid $gray-third;
            }

            &:before {
                border-color: $gray-third;
            }
        }    
    }
}
</style>
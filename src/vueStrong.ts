import Vue, { VueConstructor } from 'vue'
import { Store } from '@/store/index';

abstract class StrongVueClass extends Vue {
    public $store!: Store;
}
const StrongVue = Vue as VueConstructor<StrongVueClass>;

export { StrongVueClass };

export default StrongVue;
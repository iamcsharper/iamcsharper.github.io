import 'reflect-metadata';
import VueStrong, {StrongVueClass} from './vueStrong';
import App from './App.vue';
import splitPane from 'vue-splitpane';

import store from '@/store/index';

import vDragDirective from './shared/directives/v-drag';
import vClickOutside from './shared/directives/v-click-outside';

VueStrong.directive('drag', vDragDirective);
VueStrong.directive('click-outside', vClickOutside);

import './styles/app.scss';
import { ProjectMutations } from './store/types';

VueStrong.config.productionTip = false;

VueStrong.config.errorHandler = (
  err: Error, vm: Vue, info: string): void => {
  (vm as StrongVueClass).$store.commit(ProjectMutations.ADD_ERROR, err);
  return;
}

// use as global component
VueStrong.component('split-pane', splitPane);

new VueStrong({
  store,
  render: h => h(App),
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
}).$mount('#app')
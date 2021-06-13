import 'reflect-metadata';
import VueStrong from './vueStrong';
import App from './App.vue';
import splitPane from 'vue-splitpane';

import store from '@/store/index';

import vDragDirective from './shared/directives/v-drag';
import vClickOutside from './shared/directives/v-click-outside';

VueStrong.directive('drag', vDragDirective);
VueStrong.directive('click-outside', vClickOutside);

import './styles/app.scss';

VueStrong.config.productionTip = false;

// use as global component
VueStrong.component('split-pane', splitPane);

new VueStrong({
  store,
  render: h => h(App),
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
}).$mount('#app')
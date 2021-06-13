declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}
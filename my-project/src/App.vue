// App.vue

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import { RouterView } from 'vue-router';

export default {
  name: 'App',
};
</script>

<style scoped>


*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
/* App.vue styles */
#app {

}
</style>

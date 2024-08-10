<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style scoped>
/* .t {
  background: url('./assets/background.png');
  background-size: cover;
  height: 100vh;
  opacity: 0.8;
} */
</style>

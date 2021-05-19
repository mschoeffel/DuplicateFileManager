<template>
  <v-app>
    <Menu>
      <router-view/>
    </Menu>
  </v-app>
</template>

<script>
import Menu from './templates/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
  },
  data: () => ({
    //
  }),
};
</script>
<style>
  body {
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>

<template>
  <v-app>
    <Menu>
      <router-view />
    </Menu>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from './layout/Menu.vue';

export default Vue.extend({
  name: 'App',

  data: () => ({}),
  components: {
    Menu,
  },
});
</script>

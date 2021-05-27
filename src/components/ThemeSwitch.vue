<template>
  <v-switch
    v-model="themeSwitch"
    v-on:change="changeTheme"
    :label="$t('global.settings.dark-mode')"
    color="primary"
    class="mt-0"
    hide-details
  ></v-switch>
</template>
<script>
import Vue from 'vue';
import store from './../store';

export default Vue.extend({
  name: 'ThemeSwitch',
  data: () => ({
    themeSwitch: store.getters.getdarktheme,
  }),
  methods: {
    changeTheme: function () {
      this.$vuetify.theme.dark = this.themeSwitch;
      store.commit('changedarktheme', this.themeSwitch);
    },
  },
});
</script>

<style scoped></style>

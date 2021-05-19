<template>
    <div>
    <v-app-bar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>File Compare</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
      nav
        dense
      >
        <v-list-item-group>
          <v-list-item @click="route('/')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="route('/analyze')">
            <v-list-item-icon>
              <v-icon>mdi-file-search-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Analyze</v-list-item-title>
          </v-list-item>
          <v-list-item @click="route('/result')">
            <v-list-item-icon>
              <v-icon>mdi-file-remove-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Manage</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
      <v-list
      nav
        dense>
          <v-list-item-group>
          <v-list-item @click="route('/settings')">
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="route('/help')">
            <v-list-item-icon>
              <v-icon>mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>
          <v-list-item @click="route('/support')">
            <v-list-item-icon>
              <v-icon>mdi-heart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Support</v-list-item-title>
          </v-list-item>
          <v-list-item @click="routeDirect('https://github.com/mschoeffel')">
            <v-list-item-icon>
              <v-icon>mdi-github</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Github</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <slot></slot>
    </v-main>
    <v-footer app>
      <span>&copy; 2021 @mschoeffel - v{{ currentAppVersion }}</span>
    </v-footer>
    </div>
</template>
<script>

import { remote } from 'electron';

export default {
  name: 'Menu',
  data: () => ({
    drawer: false,
    currentAppVersion: remote.app.getVersion(),
  }),
  methods: {
    route(p) {
      this.$router.push({ path: p }).catch(() => {});
    },
    routeDirect(p) {
      window.open(p, null);
    },
  },
};
</script>

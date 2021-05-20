<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Duplicate File Manager</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item @click="route('/')">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="route('/analyze')">
            <v-list-item-icon>
              <v-icon>mdi-file-search-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Analyze</v-list-item-title>
          </v-list-item>
          <v-list-item @click="route('/manage')">
            <v-list-item-icon>
              <v-icon>mdi-file-remove-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Manage</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-list nav dense>
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
            <v-list-item @click="route('/info')">
              <v-list-item-icon>
                <v-icon>mdi-information-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Info</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <slot></slot>
    </v-main>
    <v-footer app>
      <span
        >&copy; {{ currentYear }} - @mschoeffel - v{{ currentAppVersion }}</span
      >
    </v-footer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {app} from '@electron/remote';

export default Vue.extend({
  name: 'Menu',
  data(): {currentAppVersion: string; drawer: boolean; currentYear: number} {
    return {
      currentAppVersion: app.getVersion(),
      drawer: false,
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    route(p: string): void {
      this.$router.push({path: p});
    },
    routeDirect(p: string): void {
      window.open(p);
    },
  },
});
</script>

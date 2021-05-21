<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-subtitle>Settings of this directory</v-card-subtitle>
      <v-card-text>
        <LanguageSelector></LanguageSelector>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import LanguageSelector from '@/components/LanguageSelector.vue';

export default Vue.extend({
  name: 'Settings',
  components: {
    LanguageSelector,
  },
});
</script>

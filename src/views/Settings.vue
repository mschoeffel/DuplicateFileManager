<template>
  <v-container>
    <v-card>
      <v-card-title>{{ $t('settings.heading') }}</v-card-title>
      <v-card-subtitle>{{ $t('settings.description') }}</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <LanguageSelector></LanguageSelector>
          </v-col>
          <v-col cols="12">
            <ThemeSwitch></ThemeSwitch>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import LanguageSelector from '@/components/LanguageSelector.vue';
import ThemeSwitch from '@/components/ThemeSwitch.vue';

export default Vue.extend({
  name: 'Settings',
  components: {
    ThemeSwitch,
    LanguageSelector,
  },
});
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>{{ $t('help.heading') }}</v-card-title>
      <v-card-subtitle>{{ $t('help.description') }}</v-card-subtitle>
      <v-card-text>TBD</v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Help',
});
</script>

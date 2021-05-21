<template>
  <v-select
    v-model="$i18n.locale"
    name="language"
    id="language"
    :items="langs"
    :label="$t('global.settings.language')"
    outlined
    dense
    hide-details
  ></v-select>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LanguageSelector',
  props: {
    duplicateFiles: {},
  },
  data: () => ({
    langs: [
      {
        text: 'English',
        value: 'en',
      },
      {
        text: 'Deutsch',
        value: 'de',
      },
    ],
  }),
});
</script>

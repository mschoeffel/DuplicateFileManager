<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ $t('info.heading') }}</v-card-title>
          <v-card-subtitle>{{ $t('info.description') }}</v-card-subtitle>
          <v-card-text>TBD</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ $t('info.changelog.heading') }}</v-card-title>
          <v-card-subtitle>{{
            $t('info.changelog.description')
          }}</v-card-subtitle>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><strong>Major Version 0</strong></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-timeline align-top dense clipped>
                    <v-timeline-item color="secondary">
                      <v-row class="pt-1" no-gutters>
                        <v-col cols="3">
                          <strong>27.05 2021 15:00 CEST</strong>
                        </v-col>
                        <v-col cols="8">
                          <strong>Version 0.2.5</strong>
                          <div class="caption">
                            {{ $t('info.changelog.025.summary') }}.
                          </div>
                          <div>
                            <ul>
                              <li>
                                {{ $t('info.changelog.025.translation') }}.
                              </li>
                              <li>{{ $t('info.changelog.025.icon') }}.</li>
                              <li>{{ $t('info.changelog.025.toolbar') }}.</li>
                              <li>{{ $t('info.changelog.025.title') }}.</li>
                              <li>{{ $t('info.changelog.025.changelog') }}.</li>
                            </ul>
                          </div>
                        </v-col>
                      </v-row>
                    </v-timeline-item>
                  </v-timeline>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Info',
});
</script>

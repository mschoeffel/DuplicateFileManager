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
          <v-card-subtitle
            >{{ $t('info.changelog.description') }}
          </v-card-subtitle>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><strong>Major Version 0</strong></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-timeline align-top dense clipped>
                    <v-timeline-item
                      color="secondary"
                      v-for="item in items"
                      :key="item.version"
                    >
                      <v-row class="pt-1" no-gutters>
                        <v-col cols="3">
                          <strong>{{ item.time }}</strong>
                        </v-col>
                        <v-col cols="8">
                          <strong>Version {{ item.version }}</strong>
                          <div class="caption">{{ $t(item.summary) }}.</div>
                          <div>
                            <ul>
                              <li v-for="log in item.logs" :key="log">
                                {{ $t(log) }}.
                              </li>
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
  data: () => {
    return {
      items: [
        {
          version: '0.2.6',
          time: '27.05 2021 15:00 CEST',
          summary: 'info.changelog.026.summary',
          logs: ['info.changelog.026.icon', 'info.changelog.026.title'],
        },
        {
          version: '0.2.5',
          time: '27.05 2021 14:00 CEST',
          summary: 'info.changelog.025.summary',
          logs: [
            'info.changelog.025.translation',
            'info.changelog.025.toolbar',
            'info.changelog.025.changelog',
          ],
        },
      ],
    };
  },
});
</script>

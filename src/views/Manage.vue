<template>
  <v-container>
    <v-card>
      <v-card-title>{{ $t('manage.heading') }}</v-card-title>
      <v-card-subtitle>{{ $t('manage.description') }}</v-card-subtitle>
      <v-card-text>
        <v-row class="text-center">
          <v-col cols="12">
            <v-file-input
              @change="showFileData"
              v-model="inputFile"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row class="text-center" v-if="showResult">
          <v-col cols="12">
            <v-pagination
              v-model="currentPage"
              :length="maxPages"
              total-visible="7"
              @input="navigatePage"
            ></v-pagination>
          </v-col>
        </v-row>
        <v-row class="text-center" v-if="showResult">
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(value, name, index) in shownFiles"
                :key="name"
              >
                <v-expansion-panel-header
                  :disable-icon-rotate="value.length <= 1"
                >
                  {{ index + 1 + (currentPage - 1) * pageSize }}
                  <template v-if="value.length <= 1" v-slot:actions>
                    <v-icon color="success"> mdi-check </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <DuplicateFilesList
                    :duplicateFiles="value"
                    @remove="removeItem($event, name)"
                  >
                  </DuplicateFilesList>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import DuplicateFilesList from '@/components/DuplicateFilesList.vue';
import {DuplicateFile} from '@/model/DuplicateFile';

import {ipcRenderer} from 'electron';

export default Vue.extend({
  data(): {
    duplicateFiles: Record<string, DuplicateFile[]>;
    shownFiles: Record<string, DuplicateFile[]>;
    inputFile: File;
    showResult: boolean;
    currentPage: number;
    maxPages: number;
    pageSize: number;
  } {
    return {
      duplicateFiles: {},
      shownFiles: {},
      inputFile: {} as File,
      showResult: false,
      currentPage: 1,
      maxPages: 6,
      pageSize: 10,
    };
  },
  components: {
    DuplicateFilesList,
  },
  methods: {
    showFileData() {
      if (this.inputFile != null && this.inputFile.path != null) {
        const result = ipcRenderer.sendSync('read-file', this.inputFile.path);
        if (!result.error) {
          this.duplicateFiles = JSON.parse(result.data);
          this.maxPages =
            Math.floor(
              Object.keys(this.duplicateFiles).length / this.pageSize
            ) + 1;
          this.generateVisibleData();
          this.showResult = true;
        } else {
          this.showResult = false;
          console.log(result.error);
        }
      } else {
        this.showResult = false;
        this.duplicateFiles = {};
      }
    },
    removeItem(id: number, name: string) {
      this.duplicateFiles[name] = this.duplicateFiles[name].filter(
        i => i.id !== id
      );
      this.shownFiles[name] = this.shownFiles[name].filter(i => i.id !== id);
      this.writeJson();
    },
    writeJson() {
      ipcRenderer.sendSync('write-json-file', {
        path: this.inputFile.path,
        data: this.duplicateFiles,
      });
    },
    generateVisibleData() {
      const temp: Record<string, DuplicateFile[]> = {};
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.pageSize * this.currentPage;
      const keys = Object.keys(this.duplicateFiles);
      for (let i = start; i < end && i < keys.length; i += 1) {
        temp[keys[i]] = this.duplicateFiles[keys[i]];
      }
      this.shownFiles = temp;
      console.log(this.shownFiles);
    },
    navigatePage() {
      this.generateVisibleData();
    },
  },
});
</script>

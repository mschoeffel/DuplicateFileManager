<template>
  <v-container>
    <v-card>
      <v-card-title>Manage Result</v-card-title>
      <v-card-subtitle>Read Result File and manage </v-card-subtitle>
      <v-card-text>
        <v-row class="text-center">
          <v-col cols="12">
            <v-file-input
              @change="showFileData"
              v-model="fileinput"
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
                v-for="(value, name, index) in shownfiles"
                :key="name"
              >
                <v-expansion-panel-header
                  :disable-icon-rotate="value.length <= 1"
                >
                  {{ index + 1 + (currentPage - 1) * pageSize }}
                  <template v-if="value.length <= 1" v-slot:actions>
                    <v-icon color="teal"> mdi-check </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <DuplicateFilesComp
                    :samefiles="value"
                    @remove="removeItem($event, name)"
                  >
                  </DuplicateFilesComp>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import DuplicateFilesComp from '../components/DuplicateFiles.vue';

const { ipcRenderer } = require('electron');

export default {
  data: () => ({
    fileinput: {},
    duplicatefiles: {},
    shownfiles: {},
    showResult: false,
    currentPage: 1,
    maxPages: 6,
    pageSize: 10,
  }),
  components: {
    DuplicateFilesComp,
  },
  methods: {
    showFileData() {
      if (this.fileinput != null && this.fileinput.path != null) {
        const result = ipcRenderer.sendSync('read-file', this.fileinput.path);
        if (!result.error) {
          this.duplicatefiles = JSON.parse(result.data);
          this.maxPages = Math.floor(Object.keys(this.duplicatefiles).length / this.pageSize) + 1;
          this.generateVisibleData();
          this.showResult = true;
        } else {
          this.showResult = false;
          console.log(result.error);
        }
      } else {
        this.showResult = false;
        this.duplicatefiles = {};
      }
    },
    removeItem(id, name) {
      this.duplicatefiles[name] = this.duplicatefiles[name].filter(
        (i) => i.id !== id,
      );
      console.log(this.duplicatefiles);
      this.writeJson();
    },
    writeJson() {
      ipcRenderer.sendSync('write-json-file', { path: this.fileinput.path, data: this.duplicatefiles });
    },
    generateVisibleData() {
      const temp = {};
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.pageSize * this.currentPage;
      const keys = Object.keys(this.duplicatefiles);
      for (let i = start; i < end && i < keys.length; i += 1) {
        temp[keys[i]] = this.duplicatefiles[keys[i]];
      }
      this.shownfiles = temp;
    },
    navigatePage() {
      this.generateVisibleData();
    },
  },
};
</script>

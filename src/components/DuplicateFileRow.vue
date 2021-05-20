<template>
  <tr :key="file.id">
    <td class="text-left">{{ file.id }}</td>

    <td class="text-left">
      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <span v-bind="attrs" v-on="on">{{ file.name }}</span>
        </template>
        <span>{{ file.path }}</span>
      </v-tooltip>
    </td>
    <td class="text-left">
      <v-tooltip right :disabled="fileExists">
        <template v-slot:activator="{on, attrs}">
          <v-img
            v-bind="attrs"
            v-on="on"
            lazy-src="@/assets/fnf.jpg"
            max-height="150"
            max-width="250"
            :src="exists(file.path)"
          ></v-img>
        </template>
        <span>File not found</span>
      </v-tooltip>
    </td>
    <td class="text-center">
      <v-btn
        :disabled="!fileExists"
        color="error"
        @click="remove(file.id, file.path)"
        outlined
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import {ipcRenderer} from 'electron';

export default Vue.extend({
  name: 'DuplicateFileRow',
  props: {
    file: {},
  },
  data(): {fileExists: boolean} {
    return {
      fileExists: false,
    };
  },
  methods: {
    remove(id: number, path: string): void {
      const r = ipcRenderer.sendSync('delete-file', path);
      if (!r.error) {
        this.$emit('remove', id);
      } else {
        console.log(r.error);
      }
    },
    exists(path: string): string {
      const r = ipcRenderer.sendSync('exists-file', path);
      this.fileExists = r;
      if (r) {
        return `atom://${path}`;
      }
      return 'require("@/assets/fnf.jpg")';
    },
  },
});
</script>

<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Name</th>
            <th class="text-left">Preview</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <DuplicateFileRow
            v-for="file in duplicateFiles"
            :key="file.id"
            :file="file"
            @remove="remove"
          ></DuplicateFileRow>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import DuplicateFileRow from './DuplicateFileRow.vue';

export default Vue.extend({
  name: 'DuplicateFilesList',
  props: {
    duplicateFiles: {},
  },
  components: {
    DuplicateFileRow,
  },
  data: () => ({}),
  methods: {
    remove(id: number): void {
      this.$emit('remove', id);
    },
  },
});
</script>

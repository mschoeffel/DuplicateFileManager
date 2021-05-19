<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Id
            </th>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Preview
            </th>
            <th class="text-center">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          <DuplicateFileRow v-for="file in samefiles"
          :key="file.id" :file="file" @remove="remove"></DuplicateFileRow>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import DuplicateFileRow from './DuplicateFileRow.vue';

export default {
  props: {
    samefiles: {
      type: Array,
    },
  },
  components: {
    DuplicateFileRow,
  },
  data: () => ({}),
  methods: {
    remove(id) {
      this.$emit('remove', id);
    },
  },
};
</script>

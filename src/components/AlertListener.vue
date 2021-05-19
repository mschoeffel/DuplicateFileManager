<template>
  <div>
    <v-alert
      v-for="error in alerts"
      :type="error.type"
      :key="error.id"
      dismissible
      @input="deleteError(error.id)"
    >
      {{ error.message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertListener',
  data() {
    return {
      alerts: [],
    };
  },
  methods: {
    deleteError(id) {
      this.alerts.splice(
        this.alerts.findIndex((i) => i.id === id),
        1,
      );
    },
    addAlert(alert) {
      console.log('TEst');
      this.alerts.push({ id: this.generateId(10), message: alert.message, type: alert.type });
    },
    generateId(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
  },
};
</script>

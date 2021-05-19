<template>
  <v-container>
      <AlertListener ref="alert"></AlertListener>
    <v-card>
      <v-card-title>Support</v-card-title>
      <v-card-subtitle>You can support me and this project</v-card-subtitle>
      <v-card-text>TBD</v-card-text>
      <v-card-text v-if="false">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field
                v-model="btcaddr"
                id="btcaddr"
                append-icon="mdi-content-copy"
                type="text"
                name="BTC Address"
                label="BTC Address"
                readonly
                :success="successBtcCopy"
                :success-messages="successBtcMessage"
                @click:append="copyField('btcaddr')"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="ethaddr"
                id="ethaddr"
                append-icon="mdi-content-copy"
                type="text"
                name="ETH Address"
                label="ETH Address"
                readonly
                :success="successEthCopy"
                :success-messages="successEthMessage"
                @click:append="copyField('ethaddr')"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import AlertListener from '../components/AlertListener.vue';

export default {
  name: 'Support',
  data: () => ({
    btcaddr: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
    ethaddr: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
    successBtcCopy: false,
    successBtcMessage: '',
    successEthCopy: false,
    successEthMessage: '',
  }),
  components: {
    AlertListener,
  },
  methods: {
    copyField(id) {
      const input = document.getElementById(id);
      input.select();
      document.execCommand('copy');
      switch (id) {
        case 'btcaddr':
          this.successCopyBtc();
          break;
        case 'ethaddr':
          this.successCopyEth();
          break;
        default:
      }
    },
    successCopyBtc() {
      this.successBtcCopy = true;
      this.successBtcMessage = 'Address copied';
      setInterval(() => { this.successBtcCopy = false; this.successBtcMessage = ''; }, 3000);
    },
    successCopyEth() {
      this.successEthCopy = true;
      this.successEthMessage = 'Address copied';
      setInterval(() => { this.successEthCopy = false; this.successEthMessage = ''; }, 3000);
    },
    alertAdd(obj) {
      this.$refs.alert.addAlert(obj);
    },
  },
};
</script>

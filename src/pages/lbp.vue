<template>
  <head>
    <title>Local Terra LBP</title>
  </head>
  <body>
    <header class="page-layout">
      <router-link to="/">
        <img
          src="@/assets/logo-horizontal-dark.svg"
          alt="Local Terra Logo"
          class="logo"
        />
      </router-link>
      <nav>
        <a href="#">
          <button class="wallet" @click="initWallet()">
            <p v-if="walletAddress.length > 0">
              {{ formatAddress(walletAddress) }}
            </p>
            <p v-else>connect</p>
            <img src="@/assets/ic_wallet.svg" alt="Connect your wallet" />
          </button>
        </a>
      </nav>
    </header>

    <main>
      <section class="lbp-info page-layout">
        <InfoCard
          class="text-primary"
          :loading="tokenPrice.loading"
          :label="'LOCAL Price'"
          :value="'$' + formatTokenPrice(tokenPrice.value)"
        />
        <InfoCard
          :label="'Tokens Remaining'"
          :loading="tokensRemaining.loading"
          :value="formatTokenAmount(tokensRemaining.value.amount, 0)"
          :more="tokensRemaining.value.percentage + '%'"
        />
        <InfoCard
          :label="'Current LBP Weight'"
          :loading="currentLbpWeight.loading"
          :value="currentLbpWeight.value"
        />
        <InfoCard
          :label="'Time Remaining'"
          :loading="secondsRemaining.loading"
          :value="durationString(secondsRemaining.value)"
        />
      </section>

      <section class="wrap-content page-layout">
        <SwapForm />
        <Chart :title="'LOCAL Chart'" />
      </section>

      <ModalLoading :loading="pageLoading" />

      <Modal @close="dismissDialog" :modalActive="pageModal.show">
        <div class="modal-content card">
          <div class="content">
            <h2 v-html="pageModal.title" />
            <div class="content-info">
              <img
                v-if="pageModal.isSuccess"
                src="@/assets/lbp-illustration.png"
                alt="Girl holding a LOCAL token smiling"
              />
              <p v-html="pageModal.message" />
            </div>
            <button class="primary" @click="dismissDialog">Dismiss</button>
          </div>
        </div>
      </Modal>
    </main>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import { formatAddress, formatAmount } from "@/shared";
import { mapActions, mapGetters } from "vuex";
import {
  formatTokenAmount,
  formatTokenPrice,
} from "@/helpers/number_formatters";
import { durationString } from "@/helpers/time_formatters";
import Chart from "@/components/Chart";
import InfoCard from "@/components/InfoCard.vue";
import SwapForm from "@/components/SwapForm.vue";
import ModalLoading from "@/components/ModalLoading";
import Modal from "@/components/Modal";

export default defineComponent({
  name: "lbp",
  components: {
    Modal,
    ModalLoading,
    Chart,
    InfoCard,
    SwapForm,
  },
  data() {
    return {
      showDialog: true,
    };
  },
  mounted: async function () {
    await this.fetchCurrentPair();
    await this.$nextTick(function () {
      setInterval(() => this.fetchCurrentPair, 60000);
    });
  },
  computed: mapGetters([
    "walletAddress",
    "tokenPrice",
    "tokensRemaining",
    "currentLbpWeight",
    "secondsRemaining",
    "pageLoading",
    "pageModal",
  ]),
  methods: {
    ...mapActions(["initWallet", "fetchCurrentPair"]),
    durationString,
    formatAmount,
    formatAddress,
    formatTokenAmount,
    formatTokenPrice,
    dismissDialog: function () {
      this.pageModal.show = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/app.scss";
@import "@/style/tokens.scss";

.wrap-content {
  display: flex;
  gap: 24px;
  padding-bottom: 24px;
}

.lbp-info {
  display: flex;
  gap: 24px;
  margin-top: 80px;
  margin-bottom: 24px;
}

.modal-content {
  display: inline-flex;
  background-color: $gray150;
  margin-top: 10%;
  z-index: 100;
  .content {
    h2 {
      font-size: 28px;
      margin-top: 16px;
      margin-bottom: 32px;
      text-align: center;
    }
    .content-info {
      display: inline-flex;
      margin-bottom: 24px;
      margin-right: 36px;
      p {
        width: 250px;
      }
      img {
        width: 300px;
        height: 300px;
      }
    }
    button {
      margin-left: auto;
      margin-right: auto;
    }
  }
}

@media only screen and (max-width: 600px) {
  .lbp-info {
    flex-wrap: wrap;
    align-content: center;
    gap: 24px;
    margin-top: 40px;
    margin-bottom: 24px;
  }

  .wrap-content {
    flex-direction: column;
  }
}
</style>

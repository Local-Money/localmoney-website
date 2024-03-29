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

      <ModalFeedback
        :modalFeedback="pageFeedback"
        @close="pageFeedback.dismiss()"
      />
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
import ModalFeedback from "@/components/ModalFeedback";

export default defineComponent({
  name: "lbp",
  components: {
    ModalFeedback,
    ModalLoading,
    Chart,
    InfoCard,
    SwapForm,
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
    "pageFeedback",
  ]),
  methods: {
    ...mapActions(["initWallet", "fetchCurrentPair"]),
    durationString,
    formatAmount,
    formatAddress,
    formatTokenAmount,
    formatTokenPrice,
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

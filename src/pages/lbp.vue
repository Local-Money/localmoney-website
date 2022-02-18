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
      <nav v-if="this.isLbpRunning">
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

    <main v-if="this.isLbpRunning">
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

      <ModalDisclaimer
        :show="showDisclaimer && !closedDisclaimer"
        @close="hideDisclaimer"
      />
    </main>
    <main v-else>
      <section class="wrap-content page-layout lbp-over-wrap">
        <div class="card lbp-over-item">
          <h2 v-if="willStartSoon">The LBP will start soon! :)</h2>
          <h2 v-if="alreadyFinished">The LBP is over! :(</h2>
        </div>
      </section>
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
import ModalDisclaimer from "@/components/ModalDisclaimer";

export default defineComponent({
  name: "lbp",
  components: {
    ModalDisclaimer,
    ModalFeedback,
    ModalLoading,
    Chart,
    InfoCard,
    SwapForm,
  },
  data() {
    return {
      closedDisclaimer: false,
      secondsToStart: undefined,
    };
  },
  mounted: function () {
    this.fetchCurrentPair();
    this.$nextTick(function () {
      setInterval(async () => await this.fetchCurrentPair(), 30000);
    });
  },
  computed: {
    ...mapGetters([
      "walletAddress",
      "tokenPrice",
      "tokensRemaining",
      "currentLbpWeight",
      "secondsRemaining",
      "pageLoading",
      "pageFeedback",
      "isLbpRunning",
      "lbpStartTime",
      "lbpEndTime",
    ]),
    showDisclaimer: function () {
      let show = localStorage.showDisclaimer;
      if (show === "false") {
        return false;
      }
      return true;
    },
    willStartSoon: function () {
      const currentTime = Math.floor(Date.now() / 1000);
      return this.lbpStartTime > currentTime;
    },
    alreadyFinished: function () {
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime > this.lbpEndTime;
    },
  },
  methods: {
    ...mapActions(["initWallet", "fetchCurrentPair"]),
    durationString,
    formatAmount,
    formatAddress,
    formatTokenAmount,
    formatTokenPrice,
    hideDisclaimer: function () {
      this.closedDisclaimer = true;
      localStorage.showDisclaimer = "false";
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

.lbp-over-wrap {
  width: 100%;
  padding-top: 100px;
  display: flex;
  justify-content: center;
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

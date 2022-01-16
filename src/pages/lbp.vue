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
        <!-- <a href="#">Dashboard</a>
        <a href="#">Swap</a> -->
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
        <div class="info card">
          <p class="label">LOCAL Price</p>
          <p class="value">
            <span class="text-primary">${{ tokenPrice }}</span>
          </p>
        </div>
        <div class="info card">
          <p class="label">Tokens Remaining</p>
          <p class="value">
            {{ formatTokenAmount(coinsRemaining, 0) }}
            <span class="percentage">({{ coinsRemainingPercentage }}%)</span>
          </p>
        </div>
        <div class="info card">
          <p class="label">Current LBP Weight</p>
          <p class="value">{{ nativeTokenWeight }} : {{ saleTokenWeight }}</p>
        </div>
        <div class="info card">
          <p class="label">Time Remaining</p>
          <p class="value">
            {{ durationString(secondsRemaining) }}
          </p>
        </div>
      </section>

      <section class="wrap-content page-layout">
        <div class="swap card">
          <h2>Swap</h2>
          <form action="">
            <token-input
              v-model="saleTokenAmount"
              :label="'From'"
              :tokenBalance="
                formatTokenAmount(walletAddress.length > 0 ? balance : 0, 6)
              "
              :tokenSymbol="nativeTokenSymbol"
            />

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              class="icon-24"
            >
              <g clip-path="url(#clip0_7_155)">
                <path
                  d="M1 7L5 3L9 7"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 21L9 21C7.93913 21 6.92172 20.5786 6.17157 19.8284C5.42143 19.0783 5 18.0609 5 17L5 3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23 17L19 21L15 17"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 3L15 3C16.0609 3 17.0783 3.42143 17.8284 4.17157C18.5786 4.92172 19 5.93913 19 7L19 21"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>

            <token-input
              v-model="nativeTokenAmount"
              :label="'To (estimated)'"
              :tokenBalance="
                formatTokenAmount(
                  walletAddress.length > 0 ? tokenBalance : 0,
                  6
                )
              "
              :tokenSymbol="saleTokenInfo.symbol"
            />

            <button class="primary" @click="swap()" :disabled="!valid">
              Swap
            </button>
          </form>
        </div>

        <div class="graph card">
          <h2>LOCAL Chart</h2>
          <apexchart
            width="100%"
            type="area"
            :options="options"
            :series="series"
          ></apexchart>
        </div>
      </section>
    </main>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import { formatAddress, formatAmount } from "@/shared";
import { mapActions, mapGetters } from "vuex";
import { formatTokenAmount } from "../helpers/number_formatters";
import { durationString } from "../helpers/time_formatters";
import TokenInput from "../components/TokenInput.vue";

export default defineComponent({
  name: "lbp",
  components: {
    TokenInput,
  },
  data() {
    return {
      nativeTokenAmount: undefined,
      saleTokenAmount: undefined,
      valid: true,
      options: {
        chart: {
          id: "vuechart-example",
          width: "100%",
          height: "100%",
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        colors: ["#ef6100"],
        fill: {
          gradient: {
            opacityFrom: 0.3,
            opacityTo: 0,
          },
        },
        stroke: {
          width: 3,
        },
        xaxis: {
          type: "datetime",
          tooltip: { enabled: true },
          axisTicks: { show: false },
          labels: {
            style: {
              colors: "#666666",
              fontSize: "12px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              cssClass: "graph-xaxis-label",
            },
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeUTC: true,
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "dd MMM",
            },
          },
          crosshairs: {
            show: true,
            stroke: {
              color: "#444444",
              width: 1,
              dashArray: 4,
            },
          },
          axisBorder: { show: false },
          //categories: [],
        },
        yaxis: {
          show: true,
          labels: {
            style: {
              colors: "#666666",
              fontSize: "12px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              cssClass: "graph-xaxis-label",
            },
            offsetX: 0,
          },
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: true,
          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 50,
            offsetY: 0,
          },
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            return (
              '<div class="graph-tooltip">' +
              "<p>" +
              series[seriesIndex][dataPointIndex] +
              "</p>" +
              "</div>"
            );
          },
        },
        markers: {
          colors: "#ef6100",
          strokeColors: "#ef6100",
          strokeWidth: 0,
          hover: {
            size: 6,
          },
        },
      },

      series: [
        {
          name: "series-1",
          data: [],
        },
      ],
    };
  },

  created: async function () {
    this.fetchCurrentPair();
    this.$nextTick(function () {
      setInterval(() => this.fetchCurrentPair(), 60000);
    });
  },
  mounted: async function () {
    await this.fetchPriceHistory();
    this.$nextTick(() => {
      let priceData = this.priceHistory();
      // this.$data.options.xaxis.categories = priceData.time;
      // this.$data.series[0].data= priceData.price;
      this.$data.series[0].data = priceData.series;
    });
  },
  beforeUnmount: async function () {
    clearInterval();
  },
  computed: mapGetters([
    "walletAddress",
    "balance",
    "tokenBalance",
    "nativeTokenSymbol",
    "tokenPrice",
    "nativeTokenWeight",
    "saleTokenWeight",
    "coinsRemaining",
    "coinsRemainingPercentage",
    "secondsRemaining",
    "saleTokenInfo",
    "priceHistory",
  ]),
  methods: {
    ...mapActions(["initWallet", "fetchCurrentPair", "fetchPriceHistory"]),
    formatTokenAmount,
    durationString,
    formatAmount,
    formatAddress,
    swap: function () {},
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

  .info {
    width: 25%;
    text-align: center;
    transition: border 150ms ease-in;

    &:hover {
      border: 1px solid $primary;
      transition: border 500ms ease-out;
    }

    .label {
      font-size: 14px;
      color: $gray700;
      margin-bottom: 8px;
    }
    .value {
      font-size: 28px;
      font-weight: $semi-bold;

      .percentage {
        vertical-align: middle;
        font-size: 16px;
        font-weight: $semi-bold;
        color: $gray700;
      }
    }
  }
}
.graph {
  width: 63%;

  h2 {
    font-size: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid $border;
    margin-bottom: 24px;
    text-align: center;
  }
}

.swap {
  width: 37%;

  h2 {
    font-size: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid $border;
    margin-bottom: 24px;
    text-align: center;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: $gray700;
  }

  .balance {
    font-size: 14px;
    color: $gray700;
    text-align: right;
    margin-top: 8px;
    margin-right: 8px;
  }

  button {
    width: 100%;
    height: 48px;
    display: block;
    margin-top: 32px;
  }

  .input-wrap {
    position: relative;
    .meta {
      position: absolute;
      right: 24px;
      top: 11px;
      display: flex;
      p {
        margin-right: 8px;
      }
      img {
        vertical-align: middle;
        width: 24px;
        height: 24px;
      }
    }
    input {
      height: 48px;
      background-color: $gray100;
      font-size: 16px;
      font-weight: $regular;
      appearance: none;
      margin: 0;
      color: $primary;
      border: 1px solid $gray100;

      &:hover,
      &:focus {
        border: 1px solid $primary;
      }
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      opacity: 0;
    }
  }

  svg {
    width: 20px;
    height: 20px;
    display: block;
    margin: 16px auto;
    stroke: $gray700;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    padding: 16px;
  }

  .lbp-info {
    flex-wrap: wrap;
    align-content: center;
    gap: 24px;
    margin-top: 40px;
    margin-bottom: 24px;

    .info {
      width: 46%;
      text-align: center;
      transition: border 150ms ease-in;

      .label {
        font-size: 14px;
        margin-bottom: 4px;
      }
      .value {
        font-size: 20px;
      }
    }
  }
  .wrap-content {
    flex-direction: column;

    .graph,
    .swap {
      width: 100%;
    }
  }
}
</style>

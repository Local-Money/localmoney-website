<template>
  <div class="swap card">
    <h2>Swap</h2>
    <TokenInput
      :value="simulation.fromAmount"
      :label="'From'"
      :balance="fromBalance"
      :symbol="fromSymbol"
      @change="setFrom"
      @focus="this.isReverseSimulation = false"
    />
    <svg
      @click="isSelling = !isSelling"
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
    <TokenInput
      :value="simulation.toAmount"
      :label="'To (estimated)'"
      :balance="toBalance"
      :symbol="toSymbol"
      @change="setTo"
      @focus="this.isReverseSimulation = true"
    />
    <div class="wrap-summary">
      <!-- <h4>Transaction Summary:</h4> -->
      <div class="wrap-label">
        <p>Transaction Fee</p>
        <p>Price Impact</p>
        <p>LOCAL Price (estimated</p>
      </div>
      <div class="wrap-value">
        <p>~ {{ transactionFee }}</p>
        <p>{{ priceImpact }}</p>
        <p>${{ formatTokenPrice(simulation.simulatedPrice) }}</p>
      </div>
    </div>
    <div class="warning">
      <p>
        Warning: The numbers above are estimates and could change based on
        network activity between the time you submit your transaction and the
        time it completes.
      </p>
    </div>
    <button class="primary bg-gray300" @click="swap()" :disabled="!isValid">
      Swap
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import {
  formatTokenAmount,
  formatTokenPrice,
  fromFormattedString,
} from "@/helpers/number_formatters";
import TokenInput from "@/components/TokenInput.vue";
import { Dec } from "@terra-money/terra.js";

const DIRECTION_FROM = 0;
const DIRECTION_TO = 1;

export default defineComponent({
  name: "SwapForm",
  props: {},
  components: {
    TokenInput,
  },
  data() {
    return {
      simulationTimeout: undefined,
      simulate: this.getSimulation,
      reverseSimulate: this.getReverseSimulation,
      simulation: {
        fromAmount: undefined,
        toAmount: undefined,
        priceImpact: 0,
        simulatedPrice: 0,
      },
      isReverseSimulation: true,
      isSelling: false,
    };
  },
  watch: {
    isSelling(selling) {
      if (selling) {
        this.simulate = this.getReverseSimulation;
        this.reverseSimulate = this.getSimulation;
      } else {
        this.simulate = this.getSimulation;
        this.reverseSimulate = this.getReverseSimulation;
      }
      this.simulation.fromAmount = this.simulation.toAmount;
      this.simulation.toAmount = null;
    },
  },
  computed: {
    ...mapGetters([
      "tokenAsset",
      "nativeAsset",
      "walletAddress",
      "balance",
      "tokenBalance",
      "tokenPrice",
      "nativeTokenSymbol",
      "saleTokenInfo",
      "maxSwapFee",
    ]),
    fromSymbol() {
      return this.isSelling ? this.tokenAsset.symbol : this.nativeAsset.symbol;
    },
    toSymbol() {
      return this.isSelling ? this.nativeAsset.symbol : this.tokenAsset.symbol;
    },
    fromBalance() {
      return this.isSelling
        ? this.tokenAsset.balance
        : this.nativeAsset.balance;
    },
    toBalance() {
      return this.isSelling
        ? this.nativeAsset.balance
        : this.tokenAsset.balance;
    },
    isValid() {
      const fromBalanceInt = parseInt(this.fromBalance.replace(/\D/g, ""));

      const maxSwapFeeInt = parseInt(this.maxSwapFee);
      const nativeAssetBalance = fromFormattedString(this.nativeAsset.balance)
        .mul(10 ** 6)
        .toNumber();

      const canAffordFees = nativeAssetBalance > maxSwapFeeInt + 1;
      const addressIsValid = this.walletAddress.length > 0;
      let fromAmount = this.simulation.fromAmount;
      const fromIsValid = fromAmount > 0 && fromAmount <= fromBalanceInt;
      return addressIsValid && fromIsValid && canAffordFees;
    },
    transactionFee() {
      if (this.maxSwapFee) {
        return Dec.div(this.maxSwapFee, 10 ** 6).toFixed(2);
      } else {
        return "";
      }
    },
    priceImpact() {
      if (this.simulation.priceImpact) {
        return this.simulation.priceImpact;
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapActions([
      "getSimulation",
      "getReverseSimulation",
      "swapTokens",
      "fetchTokenPrice",
    ]),
    formatTokenAmount,
    formatTokenPrice,
    setInputValue(value, direction) {
      clearTimeout(this.simulationTimeout);
      this.simulationTimeout = setTimeout(async () => {
        if (value === undefined || value === null) {
          switch (direction) {
            case DIRECTION_FROM:
              Object.assign(this.simulation, { fromAmount: null });
              break;
            case DIRECTION_TO:
              Object.assign(this.simulation, { toAmount: null });
              break;
          }
        } else {
          await this.fetchTokenPrice();
          const simulationResult = this.isReverseSimulation
            ? await this.reverseSimulate(value.toString())
            : await this.simulate(value.toString());

          const amount = parseInt(simulationResult.amount.mul(10 ** 6));
          const fromAmount =
            direction === DIRECTION_FROM ? amount : this.simulation.fromAmount;
          const toAmount =
            direction === DIRECTION_TO ? amount : this.simulation.toAmount;

          const simulatedPrice = this.isSelling
            ? this.isReverseSimulation
              ? value / amount
              : amount / value
            : this.isReverseSimulation
            ? amount / value
            : value / amount;
          const priceImpact =
            ((-1 + simulatedPrice / this.tokenPrice.value) * 100).toFixed(2) +
            "%";

          Object.assign(this.simulation, {
            priceImpact,
            fromAmount,
            toAmount,
            simulatedPrice,
          });
        }
      }, 500);
    },
    setFrom(value) {
      this.simulation.fromAmount = parseInt(value);
      if (!this.isReverseSimulation) {
        this.setInputValue(value, DIRECTION_TO);
      }
    },
    setTo(value) {
      this.simulation.toAmount = value;
      if (this.isReverseSimulation) {
        this.setInputValue(value, DIRECTION_FROM);
      }
    },
    async swap() {
      await this.swapTokens({
        fromAmount: this.simulation.fromAmount,
        fromSymbol: this.fromSymbol,
      });
      await this.$nextTick(() => {
        this.fromAmount = null;
        this.simulation.toAmount = null;
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/app.scss";
@import "@/style/tokens.scss";

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

.wrap-summary {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding: 16px 24px;
  background-color: $gray150;
  border-radius: 8px;
  border: 1px solid $border;

  p {
    font-size: 14px;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .wrap-label {
    color: $gray700;
  }

  .wrap-value {
    text-align: right;
  }
}

.warning {
  margin-top: 16px;
  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid $border;

  p {
    font-size: 12px;
    color: $gray700;
  }
}

@media only screen and (max-width: 600px) {
  .swap {
    width: 100%;
  }
}
</style>

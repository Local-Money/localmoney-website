<template>
  <head>
    <title>Local Terra LBP</title>
  </head>
  <body>
    <header class="page-layout">
      <nav>
        <img
          src="@/assets/logo-horizontal-dark.svg"
          alt="Local Terra Logo"
          class="logo"
        />
        <a href="#" target="_blank">
          <button class="wallet" @click="initWallet()">
            <p v-if="walletAddress.length > 0">
              {{ formatAddress(walletAddress) }}
            </p>
            <p v-if="walletAddress.length === 0">connect</p>
            <img src="@/assets/ic_wallet.svg" alt="Connect your wallet" />
          </button>
        </a>
      </nav>
    </header>

    <main>
      <section>
        <p>Price: $0.03</p>
        <p>Coins remaining: 9,000,000</p>
        <p>Time remaining: 1d 23h</p>
        <p>Current LBP Weight: 28:72</p>

      </section>
      <section class="expanded">
        <form action="">

          <label>From</label>
          <div class="input">
            <CurrencyInput
                v-model="ustAmount"
                @focus="true"
                :placeholder="0"
                :options="{
                  currency: 'UST',
                  currencyDisplay: 'hidden',
                  hideCurrencySymbolOnFocus: false,
                  hideGroupingSeparatorOnFocus: false,
                  valueRange: {
                    min: 0,
                    max: 500,
                  },
                }"/>
          </div>

          <label>To (estimated)</label>
          <div class="input">
            <CurrencyInput
                v-model="ustAmount"
                @focus="true"
                :placeholder="0"
                :options="{
                  currency: 'UST',
                  currencyDisplay: 'hidden',
                  hideCurrencySymbolOnFocus: false,
                  hideGroupingSeparatorOnFocus: false,
                }"/>
          </div>
          <button class="primary" @click="swap()" :disabled="!valid">
            swap
          </button>
        </form>
      </section>
    </main>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import CurrencyInput from "../components/CurrencyInput.vue";
import { formatAddress, formatAmount } from "@/shared";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "LBP",
  components: {
    CurrencyInput,
  },
  data() {
    return {
      ustAmount: 0,
      valid: true
    }
  },
  computed: mapGetters(["walletAddress"]),
  methods: {
    ...mapActions([]),
    formatAmount,
    formatAddress,
    swap: function () {

    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/style/app.scss";
@import "@/style/tokens.scss";

.owner {
  grid-column: 1/2;
  grid-row: 1;

  .wallet {
    font-size: 18px;
    font-weight: 600;
    color: $base-text;
  }
  .n-trades {
    font-size: 14px;
    color: $gray600;
  }

  @media only screen and (max-width: 550px) {
    .owner {
      display: inline-flex;
    }
  }
}

.expanded {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 16px;

  @media only screen and (max-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 550px) {
    grid-template-columns: 1fr 1fr;
    padding: 24px 24px;
  }

  .form-separator {
    width: 100%;
    height: 1px;
    background-color: $border;
    margin: 8px 0;
    grid-column: 1/7;
    grid-row: 2;
  }

  form {
    grid-column: 1/3;
    grid-row: 3;
    margin-top: 16px;
    padding-right: 56px;

    .input {
      margin-bottom: 24px;
    }

    label {
      font-size: 14px;
      color: $gray600;
      display: block;
    }

    input {
      color: $base-text;
      background-color: $surface;
      text-align: right;
    }

    b {
      cursor: pointer;
      font-weight: 600;
    }

    p {
      font-size: 12px;
      color: $gray600;
      text-align: right;
      margin-top: 8px;
    }
  }

  .receipt {
    grid-column: 3/7;
    grid-row: 3;
    margin-top: 16px;

    .price {
      margin-bottom: 24px;

      .label {
        font-size: 14px;
        color: $gray600;
      }

      .wrap {
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        background-color: $gray150;
        border-radius: 8px;
        padding: 10px 24px;
        margin-top: 8px;
        align-items: center;
        gap: 16px;

        .ticker {
          font-size: 12px;
          color: $primary;
        }
        .margin {
          font-size: 14px;
          color: $gray600;
        }
        .value {
          font-size: 16px;
          font-weight: 600;
          color: $base-text;
        }
      }
    }

    .summary {
      margin-bottom: 24px;

      .label {
        font-size: 14px;
        color: $gray600;
      }

      .wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: $gray150;
        border-radius: 8px;
        padding: 16px 24px;
        margin-top: 8px;

        gap: 8px;

        .item {
          display: inline-flex;
          justify-content: space-between;

          .price-get {
            font-weight: 800;
          }
          .price-pay {
            font-weight: 800;
            color: $primary;
          }
        }
      }
    }

    .wrap-btns {
      display: flex;
      justify-content: flex-end;
      gap: 24px;
    }
  }
}
</style>

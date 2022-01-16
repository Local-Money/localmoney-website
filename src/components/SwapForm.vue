<template>
  <div class="swap card">
    <h2>Swap</h2>
    <form action="">
      <TokenInput
        v-model="fromToken"
        :label="'From'"
        :tokenBalance="balance"
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

      <TokenInput
        v-model="toToken"
        :label="'To (estimated)'"
        :tokenBalance="tokenBalance"
        :tokenSymbol="saleTokenInfo.symbol"
      />

      <button class="primary" @click="swap()" :disabled="!valid">Swap</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { formatTokenAmount } from "../helpers/number_formatters";
import TokenInput from "../components/TokenInput.vue";

export default defineComponent({
  name: "SwapForm",
  props: {},
  components: {
    TokenInput,
  },
  data() {
    return {
      fromToken: undefined,
      toToken: undefined,
      valid: true,
    };
  },
  computed: mapGetters([
    "walletAddress",
    "balance",
    "tokenBalance",
    "nativeTokenSymbol",
    "saleTokenInfo",
  ]),
  methods: {
    ...mapActions([]),
    formatTokenAmount,
    swap: function () {},
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
</style>
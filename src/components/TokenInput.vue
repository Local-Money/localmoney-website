<template>
  <label>{{ label }}</label>
  <div class="input-wrap">
    <div class="meta">
      <p class="currency">{{ symbol }}</p>
      <img
        :src="require('@/assets/tokens/ic_' + symbol.toLowerCase() + '.svg')"
        :alt="symbol + ' icon'"
      />
    </div>
    <CurrencyInput
      v-model="this.localValue"
      :placeholder="'0.000'"
      @focus="this.$emit('focus')"
    />
    <p class="balance">
      Balance:
      <span style="text-decoration: underline">
        {{ balance }}
        {{ symbol }}
      </span>
    </p>
  </div>
</template>

<script>
import { ref, watch } from "vue-demi";
import CurrencyInput from "./CurrencyInput.vue";

export default {
  name: "TokenInput",
  components: { CurrencyInput },
  props: {
    value: Number,
    balance: String,
    label: String,
    symbol: {
      type: String,
      default: "LUNA",
    },
  },
  emits: ["change", "focus"],
  setup(props) {
    const localValue = ref(props.value);
    watch(
      () => props.value,
      (value) => {
        localValue.value = value;
      }
    );
    return {
      localValue,
    };
  },
  watch: {
    localValue: {
      handler: function (newValue) {
        this.$emit("change", newValue);
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/tokens.scss";

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
</style>

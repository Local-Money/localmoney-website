<template>
  <label>{{ label }}</label>
  <div class="input-wrap">
    <div class="meta">
      <p class="currency">{{ tokenSymbol }}</p>
      <img
        :src="
          require('@/assets/tokens/ic_' + tokenSymbol.toLowerCase() + '.svg')
        "
        :alt="tokenSymbol + ' icon'"
      />
    </div>
    <input ref="inputRef" type="number" placeholder="0.000" />
    <p class="balance">
      Balance:
      <span style="text-decoration: underline">
        {{ tokenBalance }}
        {{ tokenSymbol }}
      </span>
    </p>
  </div>
</template>

<script>
import { watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "TokenInput",
  props: {
    modelValue: {
      type: Number,
      required: false,
    },
    tokenBalance: String,
    label: String,
    tokenSymbol: {
      type: String,
      default: "LUNA",
    },
  },
  setup(props) {
    const { inputRef, formattedValue, setValue } = useCurrencyInput({
      locale: "en",
      currency: "USD",
      currencyDisplay: "hidden",
      precision: {
        min: 2,
        max: 6,
      },
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
      hideNegligibleDecimalDigitsOnFocus: false,
      autoDecimalDigits: false,
      valueScaling: "precision",
      autoSign: false,
      useGrouping: false,
      accountingSign: true,
    });

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    return { inputRef, formattedValue };
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

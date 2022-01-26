<template>
  <input ref="inputRef" type="number" :placeholder="placeholder" />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: {
      type: Number,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: "0.000",
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {
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
        };
      },
    },
  },
  setup(props) {
    const { inputRef, setValue, setOptions } = useCurrencyInput(props.options);
    watch(
      () => props.modelValue,
      (value) => setValue(value)
    );
    watch(
      () => props.options,
      (options) => setOptions(options)
    );
    return { inputRef };
  },
  methods: {},
};
</script>

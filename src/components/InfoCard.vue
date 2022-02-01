<template>
  <div class="info card">
    <p class="label">
      {{ label }}
    </p>

    <Loading v-if="loading" />

    <div v-else class="value">
      <p :class="$attrs.class">
        {{ value }}
        <span v-if="more != null" class="percentage">({{ more }})</span>
      </p>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

export default {
  name: "InfoCard",
  components: { Loading },
  props: {
    label: String,
    value: String,
    loading: Boolean,
    more: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/style/app.scss";
@import "@/style/tokens.scss";
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

@media only screen and (max-width: 600px) {
  .card {
    padding: 16px;
  }
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
</style>

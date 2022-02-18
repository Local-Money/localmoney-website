<template>
  <transition name="modal-animation">
    <div v-if="loading.isLoading" class="modal">
      <div class="loading">
        <Loading />
        <div class="loading-content">
          <p v-if="loading.label !== undefined" class="label">
            {{ loading.label }}
          </p>
          <a
            v-if="loading.transaction !== undefined"
            class="transaction"
            target="_blank"
            :href="
              'https://finder.terra.money/columbus-5/tx/' + loading.transaction
            "
            >{{ formatAddress(loading.transaction) }}</a
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { formatAddress } from "@/shared";
import Loading from "@/components/Loading";

export default {
  name: "ModalLoading",
  props: ["loading"],
  components: { Loading },
  methods: {
    formatAddress,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/tokens.scss";

.modal-animation-enter-active {
  transition: opacity 0.3s ease;
}
.modal-animation-leave-active {
  transition: opacity 0.3s ease;
}
.modal-animation-enter-from {
  opacity: 0;
}
.modal-animation-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(10px);
}

.loading {
  display: flex;
  flex-direction: column;
  text-align: center;

  .loading-content {
    .label {
      font-size: 16px;
    }
    .transaction {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: $primary;
      margin-top: 8px;
    }
  }
}
</style>

<template>
  <Modal @close="$emit('close')" :modalActive="modalFeedback.show">
    <div class="modal-content card">
      <div class="content">
        <h2 v-html="modalFeedback.title" />
        <div class="content-info">
          <img
            v-if="modalFeedback.isSuccess"
            src="@/assets/lbp-illustration.png"
            alt="Girl holding a LOCAL token smiling"
          />
          <p v-html="modalFeedback.message" />
        </div>
        <button class="primary" @click="$emit('close')">Dismiss</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  name: "ModalFeedback",
  props: ["modalFeedback"],
  components: {
    Modal,
  },
};

export function successFeedback(
  title = "Congratulations",
  message = "You are now part of <span class='text-primary'>LOCAL</span> community. "
) {
  return baseFeedback(true, true, title, message);
}

export function errorFeedback(
  title = "Something went wrong",
  message = "Error"
) {
  return baseFeedback(true, false, title, message);
}

export function baseFeedback(
  show = false,
  isSuccess = false,
  title = "",
  message = ""
) {
  return {
    show,
    isSuccess,
    title,
    message,
    dismiss: function () {
      this.show = false;
    },
  };
}
</script>

<style lang="scss" scoped>
@import "@/style/app.scss";
@import "@/style/tokens.scss";

.modal-content {
  display: inline-flex;
  background-color: $gray150;
  margin-top: 10%;
  z-index: 100;
  .content {
    h2 {
      font-size: 28px;
      margin-top: 16px;
      margin-bottom: 32px;
      text-align: center;
    }
    .content-info {
      display: inline-flex;
      margin-bottom: 24px;
      p {
        width: 250px;
      }
      img {
        width: 300px;
        height: 300px;
      }
    }
    button {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>

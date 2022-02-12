<template>
  <Modal @close="$emit('close')" :modalActive="modalFeedback.show">
    <div class="modal-content card">
      <div class="content">
        <div class="wrap-img">
          <img
            v-if="modalFeedback.isSuccess"
            src="@/assets/lbp-illustration.png"
            alt="Girl holding a LOCAL token smiling"
          />
        </div>
        <div class="content-info">
          <div class="close-btn" @click="$emit('close')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="inherit"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <h2 v-html="modalFeedback.title" />
          <p v-html="modalFeedback.message" />
          <div class="extra">
            <p>
              To add your LOCAL tokens to your Terra Station Wallet, use address
              bellow:
            </p>
            <div class="wrap-addr-btn">
              <p class="token-code">terra1 ... vmcwv</p>
              <p class="copied">Copied!</p>
            </div>
          </div>
        </div>
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
  title = "Awesome!",
  message = "Thanks for participating. You are now part of the <span class='text-primary'>LOCAL</span> community. "
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
  width: 700px;
  background-color: $gray150;
  margin-top: 10%;
  z-index: 100;
  .content {
    display: flex;
    .wrap-img {
      width: 40%;
      display: flex;
      align-items: center;
      img {
        width: 300px;
      }
    }
    .content-info {
      display: flex;
      flex-direction: column;
      width: 60%;
      padding: 16px 24px;
      margin-left: 24px;
      .close-btn {
        text-align: right;
        cursor: pointer;
        stroke: $primary;
      }
      h2 {
        margin-bottom: 24px;
      }
      p {
      }
    }
    button {
      display: block;
      width: 100%;
      margin-top: auto;
    }
  }
  .extra {
    margin-top: 24px;
    padding: 16px 8px;
    border-top: 1px solid $border;
    margin-top: auto;

    p {
      font-size: 12px;
      color: $gray700;
    }

    .wrap-addr-btn {
      display: flex;
      align-items: center;
      margin-top: 16px;

      .token-code {
        display: inline-block;
        background-color: $gray100;
        border: 1px solid $border;
        border-radius: 8px;
        padding: 8px 12px;
        cursor: pointer;
      }
      .copied {
        margin-left: 16px;
      }
    }
  }
}
</style>

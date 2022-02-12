<template>
  <Modal @close="$emit('close')" :modalActive="modalFeedback.show">
    <div class="modal-content card">
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
      <div class="content">
        <div class="wrap-img">
          <img
            v-if="modalFeedback.isSuccess"
            src="@/assets/lbp-illustration.png"
            alt="Girl holding a LOCAL token smiling"
          />
        </div>
        <div class="content-info">
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
  message = "Thanks for participating.</br>You are now part of the <span class='text-primary'>LOCAL</span> community. "
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
  .close-btn {
    text-align: right;
    cursor: pointer;
    stroke: $primary;
  }
  .content {
    display: flex;
    .wrap-img {
      width: 40%;
      display: flex;
      align-items: center;
      padding: 16px;
      img {
        width: 250px;
      }
    }
    .content-info {
      display: flex;
      flex-direction: column;
      width: 60%;
      padding: 16px 24px;
      margin-left: 24px;
      h2 {
        margin-bottom: 16px;
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
    padding: 24px 8px;
    border-top: 1px solid $border;

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

@media only screen and (max-width: 600px) {
  .modal-content {
    width: 90%;
    margin-top: 5vh;

    .content {
      display: flex;
      flex-direction: column;
      .wrap-img {
        width: 100%;
        padding: 0px;
        flex-direction: column;
        align-items: center;

        img {
          width: 50%;
        }
      }
      .content-info {
        width: 100%;
        padding: 16px 24px;
        margin-left: 0px;
        text-align: center;

        .extra {
          .wrap-addr-btn {
            flex-direction: column;
            .copied {
              margin-top: 8px;
              margin-left: 0;
            }
          }
        }
      }
    }
  }
}
</style>
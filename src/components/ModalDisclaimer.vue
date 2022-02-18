<template>
  <Modal @close="$emit('close')" :modalActive="show">
    <div class="modal-content card">
      <div class="content">
        <div class="wrap-img">
          <img src="@/assets/localterra-icon-white.png" alt="Guy thinking" />
        </div>
        <div class="content-info">
          <h2>Disclaimer</h2>
          <p>
            By participating in the LBP you accept the risks stated in our legal
            disclaimer.
          </p>
          <p>
            You can read more
            <router-link to="/disclaimer">
              <span class="text-primary">here.</span>
            </router-link>
          </p>
          <div class="extra">
            <button class="primary" @click="$emit('close')">
              Agree and continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  name: "ModalDisclaimer",
  props: ["show"],
  components: {
    Modal,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/app.scss";
@import "@/style/tokens.scss";

.modal-content {
  width: 650px;
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
      padding: 8px 24px;
      img {
        width: 200px;
      }
    }
    .content-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      width: 60%;
      padding: 16px 16px;
      margin-left: 16px;
      h2 {
        margin-bottom: 8px;
      }
      p {
      }
    }
    button {
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
          button {
            display: inline-block;
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <head>
    <title>Local Money Roadmap</title>
  </head>
  <body>
    <header class="page-layout">
      <router-link to="/">
        <img
          src="@/assets/logo-horizontal-dark.svg"
          alt="Local Money Logo"
          class="logo"
        />
      </router-link>
      <a href="https://app.localmoney.io/"><button class="primary">Web app</button></a>
    </header>

    <div class="wrap-hero page-layout section-spacer">
      <article>
        <h1>Trade with your peers, locally.</h1>
        <p class="sub-header">
          <span class="text-primary">Local</span> is a decentralized P2P marketplace for the crypto multi-chain world.
        </p>
        <div class="wrap-cta">
          <a href="https://localmoney.gitbook.io/docs/" target="_blank">
            <button class="primary">learn more</button>
          </a>
        </div>
      </article>
      <div class="hero-img">
        <img
          src="@/assets/header-img-2.png"
          alt="Two people making a successful trade"
        />
      </div>
    </div>

    <main>

      <section class="top-features section-spacer">
        <div class="inner page-layout">
          <h2><span class="text-primary">Fast and easy</span> on-off ramp</h2>
            <div class="wrap">
              <ul class="wrap-list">
                  <li>
                    <div class="wrap-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="wrap-content">
                      <p class="title">Secure trading</p>
                    <p class="content">Through escrow contracts, all crypto being traded is secure and will only be released once the trade is completed.</p>
                    </div>
                  </li>
                  <li>
                    <div class="wrap-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 9V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V15" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <rect x="14" y="9" width="9" height="6" rx="1" stroke="inherit" stroke-width="2"/>
                      </svg>
                    </div>
                    <div class="wrap-content">
                      <p class="title">Non-custodial</p>
                    <p class="content">You are in full control of your assets, we don't hold any funds and no login is necessary. Your keys, your coins.</p>
                    </div>
                  </li>
                  <li>
                    <div class="wrap-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12H22" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="wrap-content">
                      <p class="title">A P2P built differently</p>
                    <p class="content">No central entity has control over your data or funds and all trades take place directly between you and the other trader, on-chain.</p>
                    </div>
                  </li>
                  
              </ul>
              <div class="wrap-img">
                <img src="../assets/top-feature-03.png" alt="">
              </div>
          </div>
        </div>
      </section>

      <section class="team section-spacer">
        <div class="wrap-team page-layout">
          <h2>Meet the <span class="text-primary">team</span></h2>
          <div class="wrap-members">

            <div class="team-member">
              <img
                src="@/assets/team/02.png"
                alt="Local Money Bull"
                class="avatar squircicle"
              />
              <p class="name">Gabs</p>
              <p class="role">Designer</p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/03.png"
                alt="Local Money Bull"
                class="avatar squircicle"
              />
              <p class="name">Davi</p>
              <p class="role">Smart Contract Developer</p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/05.png"
                alt="Local Money Bull"
                class="avatar squircicle"
              />
              <p class="name">Gus</p>
              <p class="role">Business Development</p>
            </div>
          </div>
        </div>
      </section>


    </main>
    <footer class="section-spacer">
      <div class="wrap-footer page-layout">
        <router-link to="/">
          <img
            src="@/assets/logo-horizontal-dark.svg"
            alt="Local P2P Logo"
            class="logo"
          />
        </router-link>
        <div class="social">
          <a href="https://twitter.com/TeamLocalMoney" target="_blank">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1422_7695)">
                  <path
                    d="M23.456 4.44292C23.0789 4.61015 22.6913 4.75128 22.2952 4.86586C22.7642 4.33554 23.1217 3.71154 23.3399 3.0287C23.3889 2.87564 23.3381 2.70811 23.2123 2.60801C23.0867 2.50783 22.9121 2.49583 22.7738 2.57781C21.9326 3.0767 21.0251 3.43523 20.0735 3.64488C19.115 2.70826 17.8131 2.17523 16.4673 2.17523C13.6264 2.17523 11.3151 4.48643 11.3151 7.32726C11.3151 7.551 11.3292 7.7735 11.3573 7.99291C7.83198 7.68339 4.55458 5.95066 2.304 3.18997C2.2238 3.09157 2.10024 3.03854 1.97373 3.04868C1.84715 3.05859 1.73342 3.12997 1.66947 3.23967C1.21301 4.02292 0.971694 4.91874 0.971694 5.8302C0.971694 7.07162 1.41492 8.24948 2.19786 9.16984C1.9598 9.08739 1.72878 8.98434 1.50829 8.86194C1.38991 8.79606 1.24545 8.79706 1.12785 8.8645C1.01017 8.93193 0.936391 9.05595 0.933294 9.19152C0.932752 9.21435 0.932752 9.23719 0.932752 9.26034C0.932752 11.1134 1.93007 12.7817 3.45484 13.691C3.32385 13.6779 3.19293 13.6589 3.06287 13.6341C2.92878 13.6084 2.79089 13.6554 2.70047 13.7577C2.60989 13.8599 2.57993 14.0024 2.62166 14.1324C3.18604 15.8945 4.63913 17.1906 6.39577 17.5857C4.93882 18.4983 3.27267 18.9762 1.52362 18.9762C1.15866 18.9762 0.791616 18.9548 0.432391 18.9123C0.253939 18.8911 0.0833066 18.9964 0.0225324 19.1661C-0.0382418 19.3359 0.0261712 19.5252 0.177991 19.6225C2.42493 21.0632 5.02305 21.8247 7.69131 21.8247C12.9368 21.8247 16.2182 19.3512 18.0472 17.2761C20.328 14.6887 21.6361 11.2639 21.6361 7.87995C21.6361 7.73859 21.6339 7.59583 21.6296 7.45353C22.5294 6.77557 23.3042 5.95508 23.9346 5.01203C24.0304 4.86881 24.02 4.67952 23.909 4.54767C23.7982 4.41575 23.6136 4.37309 23.456 4.44292Z"
                    fill="inherit"
                  />
                </g>
              </svg>
          </a>

          <a href="https://t.co/P16BhQpcyc" target="_blank">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.942 5.55597C17.6304 4.94227 16.2429 4.5061 14.816 4.25897C14.638 4.57997 14.431 5.01297 14.287 5.35597C12.7714 5.12497 11.2296 5.12497 9.71401 5.35597C9.55508 4.98116 9.3765 4.61498 9.17901 4.25897C7.75093 4.50651 6.36231 4.94371 5.05001 5.55897C2.43901 9.50497 1.73101 13.353 2.08501 17.146C3.60917 18.2968 5.32161 19.1742 7.14601 19.739C7.55592 19.1749 7.91849 18.5778 8.23001 17.954C7.63749 17.7282 7.06623 17.4501 6.52301 17.123C6.66601 17.017 6.80601 16.906 6.94101 16.792C10.232 18.331 13.807 18.331 17.059 16.792C17.196 16.906 17.336 17.017 17.477 17.123C16.936 17.449 16.363 17.729 15.767 17.955C16.078 18.5791 16.4406 19.1762 16.851 19.74C18.6769 19.1755 20.3905 18.2974 21.915 17.145C22.33 12.749 21.206 8.93597 18.942 5.55597V5.55597ZM8.67801 14.813C7.69001 14.813 6.88001 13.891 6.88001 12.768C6.88001 11.645 7.67301 10.721 8.67801 10.721C9.68301 10.721 10.493 11.643 10.476 12.768C10.477 13.891 9.68301 14.813 8.67801 14.813ZM15.322 14.813C14.334 14.813 13.524 13.891 13.524 12.768C13.524 11.645 14.317 10.721 15.322 10.721C16.327 10.721 17.137 11.643 17.12 12.768C17.12 13.891 16.327 14.813 15.322 14.813Z"
                  fill="inherit"
                />
              </svg>
          </a>

          <a href="https://github.com/Local-Money" target="_blank">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.475 2 2 6.58819 2 12.2529C2 16.7899 4.8625 20.6219 8.8375 21.9804C9.3375 22.0701 9.525 21.7625 9.525 21.4934C9.525 21.2499 9.5125 20.4425 9.5125 19.5838C7 20.058 6.35 18.9558 6.15 18.3791C6.0375 18.0843 5.55 17.1743 5.125 16.9308C4.775 16.7386 4.275 16.2644 5.1125 16.2516C5.9 16.2388 6.4625 16.9949 6.65 17.3025C7.55 18.8533 8.9875 18.4175 9.5625 18.1484C9.65 17.4819 9.9125 17.0334 10.2 16.777C7.975 16.5207 5.65 15.6364 5.65 11.7147C5.65 10.5997 6.0375 9.67689 6.675 8.95918C6.575 8.70286 6.225 7.65193 6.775 6.24215C6.775 6.24215 7.6125 5.97301 9.525 7.29308C10.325 7.06239 11.175 6.94704 12.025 6.94704C12.875 6.94704 13.725 7.06239 14.525 7.29308C16.4375 5.9602 17.275 6.24215 17.275 6.24215C17.825 7.65193 17.475 8.70286 17.375 8.95918C18.0125 9.67689 18.4 10.5868 18.4 11.7147C18.4 15.6492 16.0625 16.5207 13.8375 16.777C14.2 17.0975 14.5125 17.7126 14.5125 18.6738C14.5125 20.0452 14.5 21.1474 14.5 21.4934C14.5 21.7625 14.6875 22.0829 15.1875 21.9804C17.1727 21.2933 18.8977 19.9852 20.1198 18.2402C21.3419 16.4952 21.9995 14.4012 22 12.2529C22 6.58819 17.525 2 12 2Z"
                  fill="inherit"
                />
              </svg>
            </a>
          <a href="https://local-money.medium.com/" target="_blank">
            <svg
                width="24"
                height="24"
                viewBox="0 0 256 146"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M72.2 0c39.877 0 72.2 32.549 72.2 72.696 0 40.148-32.326 72.694-72.2 72.694-39.872 0-72.2-32.546-72.2-72.694C0 32.55 32.325 0 72.2 0Zm115.3 4.258c19.938 0 36.101 30.638 36.101 68.438h.003c0 37.791-16.163 68.438-36.1 68.438-19.939 0-36.101-30.647-36.101-68.438 0-37.79 16.16-68.438 36.098-68.438Zm55.803 7.129c7.011 0 12.697 27.449 12.697 61.31 0 33.85-5.684 61.31-12.697 61.31-7.013 0-12.694-27.452-12.694-61.31 0-33.859 5.684-61.31 12.694-61.31Z"
                  fill="inherit"
                />
              </svg>
          </a>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},

  data: () => ({
    isMobile: false,
  }),

  beforeUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
});
</script>

<style lang="scss">
@import "@/style/app.scss";

.squircicle {
  mask: url(../assets/team/squircicle-mask.svg);
  mask-size: 100%;
}
</style>

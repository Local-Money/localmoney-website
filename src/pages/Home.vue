<template>
  <head>
    <title>Local Terra Roadmap</title>
  </head>
  <body>
    <header class="page-layout">
      <router-link to="/">
        <img
          src="@/assets/logo-horizontal-dark.svg"
          alt="Local Terra Logo"
          class="logo"
        />
      </router-link>
      <!--
      LBP BUTTON
      <nav>
        <button class="primary">
          <router-link to="/lbp">webapp</router-link>
        </button>
      </nav>
      -->
    </header>

    <div class="wrap-hero page-layout section-spacer">
      <article>
        <h1>Trade with your peers, locally.</h1>
        <p class="sub-header">
          Access all that
          <a href="https://terra.money/" target="_blank">Terra Money</a> has to
          offer.
        </p>
        <div class="wrap-cta">
          <p>Want to get notified when we launch?</p>
          <a href="https://twitter.com/local_terra" target="_blank">
            <button class="primary">Follow us</button>
          </a>
        </div>
      </article>
      <div class="hero-img">
        <img
          src="@/assets/header-img.png"
          alt="Two people making a successful trade"
        />
      </div>
    </div>

    <main>
      <section class="lbp-teaser page-layout">
        <div class="wrap-img">
          <img
            src="@/assets/lbp-hands.png"
            alt="Girl holding a LOCAL token smiling"
          />
        </div>
        <div class="wrap-content">
          <h2>
            Take your place in the future of
            <span class="text-primary">LOCAL.</span>
          </h2>
          <p>
            In a few days we will be introducing the LOCAL token. This will be
            your first chance to help us create a better access to financial
            freedom.
          </p>
          <div class="wrap-cta">
            <p>Check out our launch post.</p>
            <a
              href="https://local-terra.medium.com/announcing-our-launch-sequence-ed8431261d16?source=friends_link&sk=ea26c8b52c1d48e060ce259eac438de8"
              target="_blank"
            >
              <button class="primary">Read more</button>
            </a>
          </div>
        </div>
      </section>

      <section class="team section-spacer">
        <div class="wrap-team page-layout">
          <h2>Meet the <span class="text-primary">team</span></h2>
          <div class="wrap-members">
            <div class="team-member">
              <img
                src="@/assets/team/01.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">Sam B</p>
              <p class="role">Rust Intern</p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/02.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">Gabs</p>
              <p class="role">Designer</p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/03.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">Davi</p>
              <p class="role">Smart Contract Developer</p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/04.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">Revo</p>
              <p class="role">Smart Contract Developer</p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/05.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">Gus</p>
              <p class="role">Business Development</p>
            </div>
          </div>
        </div>
      </section>

      <section class="roadmap page-layout section-spacer">
        <h2>Roadmap</h2>

        <div class="timeline-line"></div>

        <div class="roadmap-item">
          <div class="wrap-date">
            <div class="circle"></div>
            <p class="date">Q1 . 2022</p>
          </div>
          <div class="wrap-content">
            <div class="content">
              <p class="title">LBP</p>
              <p class="description">$LOCAL token initial offer.</p>
            </div>
            <div class="content">
              <p class="title">Beta</p>
              <p class="description">Beta on Testnet with community members.</p>
              <p class="description">Security Audit.</p>
            </div>
          </div>
        </div>
        <!-- END ROADMAP ITEM -->
        <div class="roadmap-item">
          <div class="wrap-date">
            <div class="circle"></div>
            <p class="date">Q2 . 2022</p>
          </div>
          <div class="wrap-content">
            <div class="content">
              <p class="title">UST Trading v1.0</p>
              <p class="description">
                Within the first release of Local Terra, makers will be able to
                create offers to buy and sell UST.
              </p>
              <p class="description">Astroport LOCAL-UST pool.</p>
            </div>
          </div>
        </div>
        <!-- END ROADMAP ITEM -->

        <div class="roadmap-item">
          <div class="wrap-date">
            <div class="circle"></div>
            <p class="date">Q3 . 2022</p>
          </div>
          <div class="wrap-content">
            <div class="content">
              <p class="title">Luna and CW20 tokens support.</p>
              <p class="description">
                We'll provide easy and quick fiat conversion to and from your
                favorite Terra Alt by leveraging the existing UST pairs on
                different AMMs and the composability of DeFi.
              </p>
            </div>
          </div>
        </div>
        <!-- END ROADMAP ITEM -->

        <div class="roadmap-item">
          <div class="wrap-date">
            <div class="circle"></div>
            <p class="date">Q4 . 2022</p>
          </div>
          <div class="wrap-content">
            <div class="content">
              <p class="title">IBC integration</p>
              <p class="description">
                (Inter-Blockchain Communication Protocol)
              </p>
              <p class="description">
                Your Cosmos native asset will have a direct bridge with fiat
                providers, powered by the combination of the best makers and
                liquidity pools with the decentralized stablecoin, $UST.
              </p>
            </div>
          </div>
        </div>
        <!-- END ROADMAP ITEM -->

        <div class="roadmap-item">
          <div class="wrap-date">
            <div class="circle"></div>
            <p class="date">2023</p>
          </div>
          <div class="wrap-content">
            <div class="content">
              <p class="title">To the future and beyond</p>
              <p class="description">Mobile App</p>
              <p class="description">Thorchain integration</p>
              <p class="description">Deeper Anchor integration</p>
            </div>
          </div>
        </div>
        <!-- END ROADMAP ITEM -->
      </section>
    </main>
    <footer class="section-spacer">
      <div class="wrap-footer page-layout">
        <router-link to="/">
          <img
            src="@/assets/logo-horizontal-dark.svg"
            alt="Local Terra Logo"
            class="logo"
          />
        </router-link>
        <div class="social">
          <a href="https://twitter.com/local_terra" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
              ></path></svg
          ></a>

          <a href="https://github.com/Local-Terra" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path></svg
          ></a>
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
});
</script>

<style lang="scss">
@import "@/style/app.scss";

.squircicle {
  mask: url(../assets/team/squircicle-mask.svg);
  mask-size: 100%;
}
</style>

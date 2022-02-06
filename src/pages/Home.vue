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
      <nav>
        <button class="primary">
          <router-link to="/lbp">webapp</router-link>
        </button>
      </nav>
    </header>

    <div class="wrap-hero page-layout section-spacer">
      <article>
        <h1>Trade with your peers, locally.</h1>
        <p class="sub-header">
          And get access to all that
          <a href="https://www.terra.money/" target="_blank">@terra_money</a>
          has to offer.
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
      <section class="lbp-teaser section-spacer page-layout">
        <div class="wrap-img">
          <img
            src="@/assets/lbp-illustration.png"
            alt="Girl holding a LOCAL token smiling"
          />
        </div>
        <div class="wrap-content">
          <h2>
            <span class="text-primary">Join us</span> in the creation of
            something incredible.
          </h2>
          <p>
            In a couple of days we will be intodrucing the LOCAL token. This is
            our way to give the chance for you to help us build this community.
          </p>
          <div class="wrap-cta">
            <p>To know more about it, check out our launch post.</p>
            <button class="primary">Read more</button>
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
              <p class="name">Sam B.UST</p>
              <p class="role">Rust Intern</p>
              <p class="bio">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque mauris metus, aliquam ut malesuada ut, convallis in
                magna.
              </p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/02.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">gabs.ust</p>
              <p class="role">Designer</p>
              <p class="bio">
                Phasellus vitae convallis tellus. Maecenas nulla urna, malesuada
                vitae fringilla et, hendrerit ut nisi. Phasellus convallis lacus
                luctus molestie malesuada.
              </p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/03.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">davirds.ust</p>
              <p class="role">Team Member</p>
              <p class="bio">
                Sed pretium, mauris nec fermentum tristique, eros magna accumsan
                lacus, a efficitur turpis sem a velit.
              </p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/04.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">Revo</p>
              <p class="role">Team Member</p>
              <p class="bio">
                Vestibulum lobortis varius lectus, a rutrum metus faucibus eu.
                Aenean et felis tempor, fringilla augue eget, lobortis tortor.
              </p>
            </div>

            <div class="team-member">
              <img
                src="@/assets/team/05.png"
                alt="Local Terra Bull"
                class="avatar squircicle"
              />
              <p class="name">Gus</p>
              <p class="role">Team Member</p>
              <p class="bio">
                Vivamus in dolor lectus. Phasellus justo risus, consequat
                molestie molestie in, gravida at quam. Sed eget fermentum felis.
                Aenean quis nisl quam.
              </p>
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
              <p class="description">$LOCAL token initial offer</p>
            </div>
            <div class="content">
              <p class="title">v1.0 - UST Trading</p>
              <p class="description">
                Within the first release of the platform, makers will be able to
                create offers to buy and sell UST.
              </p>
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
              <p class="title">v1.1</p>
              <p class="description">Luna and CW20 tokens support.</p>
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
              <p class="title">v1.2</p>
              <p class="description">
                Support for IBC (Inter-Blockchain Communication protocol)
                tokens.
              </p>
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
              <p class="title">v1.3</p>
              <p class="description">Mobile App</p>
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
              <p class="title">v2.0</p>
              <p class="description">Thorchain integration</p>
            </div>
          </div>
        </div>
        <!-- END ROADMAP ITEM -->
      </section>
    </main>
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

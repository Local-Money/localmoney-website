<template>
  <head>
    <title>Local Terra LBP</title>
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
        <a href="#">Dashboard</a>
        <a href="#">Swap</a>
        <button class="primary">connect wallet</button>
      </nav>
    </header>

    <main>
      <section class="wrap-content page-layout section-spacer">
        <div class="lbp-info card">
          <p>Price: $0.03</p>
          <p>Coins remaining: 9,000,000</p>
          <p>Time remaining: 1d 23h</p>
          <p>Current LBP Weight: 28:72</p>
        </div>
        <div class="swap card">
          <form action="">
            <label>From</label>
            <input type="text" />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              class="icon-24"
            >
              <g clip-path="url(#clip0_7_155)">
                <path
                  d="M1 7L5 3L9 7"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 21L9 21C7.93913 21 6.92172 20.5786 6.17157 19.8284C5.42143 19.0783 5 18.0609 5 17L5 3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23 17L19 21L15 17"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 3L15 3C16.0609 3 17.0783 3.42143 17.8284 4.17157C18.5786 4.92172 19 5.93913 19 7L19 21"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
            <label>To (estimated)</label>
            <input type="text" />
            <button class="primary" @click="swap()" :disabled="!valid">
              swap
            </button>
          </form>
        </div>
      </section>
    </main>
  </body>
</template>

<script></script>

<style lang="scss" scoped>
@import "@/style/app.scss";
@import "@/style/tokens.scss";

.wrap-content {
  display: flex;
  gap: 24px;
}

.swap {
  width: 500px;

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    background-color: $gray100;
    height: 48px;
  }

  svg {
    display: block;
    margin: 24px auto;
    stroke: $primary;
  }

  button {
    margin-top: 24px;
  }
}
</style>

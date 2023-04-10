<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <nuxt-link class="navbar__link f-row" to="/">
        <svg-icon name="barcode-solid" height="20" width="20" />
        <span>barrcode</span>
      </nuxt-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
    height: 42px;
    width: 100%;
    color: #000;
    display: flex;
    align-items: center;

    &__link {
      text-decoration: none;
      color: rgba(0,0,0,.8);
      letter-spacing: 1px;
      &:hover {
        color: #000;
      }
    }
    svg {
      fill: #000;
      margin-right: 10px;
      stroke: #000;
    }

    &__inner {
      display: flex;
      align-items: center;
      padding: 0 18px;
      max-width: 1000px;
    }
}
</style>

<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import NavBar from '@/components/blocks/NavBar'

  @Component({
    components: {
      NavBar
    }
  })

export default class IndexLayout extends Vue {}
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(243, 244, 245);
    &__content {
      width: 100%;
      max-width: 1000px;
      min-height: calc(100vh - 42px);
    }
  }
  </style>

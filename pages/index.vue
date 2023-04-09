<template>
  <div class="page">
    <h1 class="page__title">
      Free barcode generator
    </h1>
    <div class="page__content">
      <BarCodeGen />
      <div class="preview card">
        <span>blob</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BarcodeGenerator from '~/components/BarCodeGen.vue'

@Component({
  components: { BarcodeGenerator },
  layout: 'index'
})

export default class Index extends Vue {
  formData = {
    content: ''
  }

  async generate () {
    try {
      const response = await this.$axios.get('/api/image.jpeg?BarcodeType=Codabar&Content=4815162342')
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  height: 100%;
  margin-left: 30px;
  min-width: 300px;
  @media(max-width: 800px) {
    margin-left: 0;
    margin-top: 30px;
    // width: 100%;

  }
}
</style>

<template>
  <div class="page">
    <h1 class="page__title">
      Free barcode generator
    </h1>
    <div class="page__content">
      <BarCodeGen @generated="renderPreview" @error="onError" />
      <div class="preview card">
        <span class="preview__title">Result</span>
        <template v-if="isGenerated">
          <img class="preview__img" :src="previewUrl" alt="barcode">

          <a :href="downloadUrl" download>
            <button class="btn btn--default preview__btn">
              <svg-icon name="download" height="16" width="16" />
              Download
            </button>
          </a>
        </template>
        <template v-else>
          <template v-if="error">
            <div class="preview__placeholder f-col">
              <svg-icon name="error" height="30" width="30" />
              <span class="error">
                {{ errorMessage }}
              </span>
            </div>
          </template>
          <template v-else>
            <div class="preview__placeholder f-col">
              <svg-icon name="image-landscape" height="30" width="30" />
              <span class="preview__hint">
                Your barcode will be rendered here
              </span>
            </div>
          </template>
        </template>
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
  previewUrl = ''
  downloadUrl = ''
  isGenerated = false
  error = false
  errorMessage = ''

  renderPreview (image:string, downloadPath: string) {
    this.isGenerated = true
    this.error = false
    this.previewUrl = image
    this.downloadUrl = 'https://api.products.aspose.app' + downloadPath
  }

  onError (msg) {
    this.isGenerated = false
    this.error = true
    this.errorMessage = msg
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

  &__title {
    font-size: 22px;
    margin-bottom: 20px;
  }

  &__hint{
    font-size: 14px;
    color: #383838;
    max-width: 250px;
  }
  &__img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    border: 2px dashed rgba(0,0,0,.2);
  }

  &__btn {
    margin-top: 20px;
  }

  &__placeholder {
    height: 100%;
    align-items: center;
    justify-content: center;
    svg {
      margin-bottom: 30px;
    }
  }
}
</style>

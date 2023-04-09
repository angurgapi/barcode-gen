<template>
  <div class="barcode-generator card">
    <NumericInput
      v-model="content"
      label="Enter barcode content"
    />
    <SizeSelector @input="recordSize" />

    <button class="btn barcode-generator__generate" @click="generate">
      Generate
      <svg-icon name="barcode" height="16" width="16"/>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NumericInput from './blocks/NumericInput.vue'
import SizeSelector from './blocks/SizeSelector.vue'

@Component({
  components: {
    NumericInput, SizeSelector
  }
})

export default class BarcodeGenerator extends Vue {
  content = ''
  height = 30
  width = 100
  format = 'jpeg'
  barcodetype = 'Codabar'

  recordSize (height, width) {
    console.log(height, width)
  }

  async generate () {
    const queryString = `image.${this.format}?barcodeType=${this.barcodetype}&content=${this.content}&width=${this.width}&height=${this.height}`
    try {
      const response = await this.$axios.get(`/api/${queryString}`)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.barcode-generator {
    &__generate {
        width: 100%;
        border: 2px solid #000;
        border-radius: 8px;
        margin-top: 20px;
        padding: 6px;
        &:hover {
          background: rgba(0,0,0,.2);
        }
    }
}
</style>

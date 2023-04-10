<template>
  <div class="barcode-generator card">
    <NumericInput
      v-model="formData.content"
      label="Enter barcode content"
      :error="contentError"
      :is-clearable="true"
      @input="contentError = false"
    />
    <div class="barcode-generator__row">
      <SizeSelector @input="recordSize" />
      <div class="format-selector f-row">
        <span class="format-selector__label">file format:</span>
        <DropDown v-model="formData.filetype" :options="formatOptions" />
      </div>
    </div>

    <button
      class="btn btn--default barcode-generator__generate"
      :disabled="isLoading"
      @click="generate"
    >
      <template v-if="isLoading">
        <svg-icon class="loader" name="loader" height="26" width="26" />
      </template>
      <template v-else>
        <svg-icon name="barcode" height="16" width="16" />
      </template>
      Generate
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NumericInput from './blocks/NumericInput.vue'
import SizeSelector from './blocks/SizeSelector.vue'
import DropDown from './blocks/DropDown.vue'

@Component({
  components: {
    NumericInput, SizeSelector, DropDown
  }
})

export default class BarcodeGenerator extends Vue {
  formatOptions = [
    {
      value: 'jpeg',
      label: 'jpeg'
    },
    {
      value: 'png',
      label: 'png'
    },
    {
      value: 'bmp',
      label: 'bmp'
    },
    {
      value: 'svg',
      label: 'svg'
    }
  ]

  formData = {
    filetype: 'jpeg',
    content: '',
    BarcodeType: 'Codabar',
    height: 30,
    width: 100
  }

  imgUrl = ''
  contentError = false
  isLoading = false

  recordSize (width, height) {
    this.$set(this.formData, 'width', width)
    this.$set(this.formData, 'height', height)
  }

  async generate () {
    this.isLoading = true

    if (this.formData.content.length) {
      const generateApi = '/api/generatebarcode?culture=en'

      try {
        const form = new URLSearchParams()
        for (const key in this.formData) {
          form.append(key, this.formData[key])
        }
        const { data } = await this.$axios.post(generateApi, form,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        // console.log(data)
        this.imgUrl = 'data:image/svg+xml;base64,' + data.imgBase64
        this.$emit('generated', this.imgUrl, data.downloadPath)
      } catch (e) { console.log(e) }
    } else {
      this.contentError = true
    }
    this.isLoading = false
  }
}
</script>

<style scoped lang="scss">
.barcode-generator {
  &__row {
    width: 100%;
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    @media(max-width: 500px){
      grid-template-columns: 1fr;
    }
  }
    &__generate {
        width: 100%;
        margin-top: 20px;
    }
}

.format-selector {
  &__label {
    margin-right: 20px;
    text-transform: uppercase;
  }
}

.loader {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="barcode-generator card">
    <div class="mode-selector f-row">
      <span class="mode-selector__label">barcode type</span>
      <DropDown v-model="formData.BarcodeType" :options="barcodeTypeOptions" />
    </div>
    <CustomInput
      v-model="formData.content"
      label="Enter barcode content"
      :error="contentError"
      type="string"
      :is-clearable="true"
      @input="contentError = false"
    />
    <div class="barcode-generator__row">
      <SizeSelector @input="recordSize" />
      <div class="barcode-generator__column f-col">
        <div class="mode-selector f-row">
          <span class="mode-selector__label">file format</span>
          <DropDown v-model="formData.filetype" :options="formatOptions" />
        </div>
        <div class="mode-selector f-row">
          <span class="mode-selector__label">show code text</span>
          <div
            class="custom-checkbox"
          >
            <label class="custom-checkbox__container">

              <input
                v-model="formData.showCodeText"
                class="custom-checkbox__input"
                type="checkbox"
              >
              <span class="custom-checkbox__checkmark" />
            </label>
          </div>
        </div>
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
import CustomInput from './blocks/CustomInput.vue'
import SizeSelector from './blocks/SizeSelector.vue'
import DropDown from './blocks/DropDown.vue'

@Component({
  components: {
    CustomInput, SizeSelector, DropDown
  }
})

export default class BarcodeGenerator extends Vue {
  formatOptions = [
    {
      value: 'jpeg',
      label: 'JPEG'
    },
    {
      value: 'png',
      label: 'PNG'
    },
    {
      value: 'bmp',
      label: 'BMP'
    },
    {
      value: 'svg',
      label: 'SVG'
    }
  ]

  barcodeTypeOptions = [
    {
      value: 'DatabarExpanded',
      label: 'GS1 DataBar Expanded'
    },
    {
      value: 'Codabar',
      label: 'Codabar'
    },
    {
      value: 'Pharmacode',
      label: 'Pharmacode'
    }
  ]

  // rules = {
  //   DatabarExpanded: 
  // }

  formData = {
    filetype: 'jpeg',
    content: '',
    BarcodeType: 'DatabarExpanded',
    height: 30,
    width: 100,
    showCodeText: true
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
    if (!this.formData.width) {
      this.$set(this.formData, 'width', 100)
    }
    if (!this.formData.height) {
      this.$set(this.formData, 'height', 30)
    }
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
        if (data.success) {
          this.imgUrl = 'data:image/svg+xml;base64,' + data.imgBase64
          this.$emit('generated', this.imgUrl, data.downloadPath)
        } else {
          this.$emit('error', data.errorMsg)
        }
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

.mode-selector {
  &__label {
    margin-right: 20px;
    text-transform: uppercase;
  }
  &:first-child {
    width: 100%;
      margin-bottom: 20px;
    }
    .dropdown {
      width: 100%;
    }
    @media(max-width: 400px){
      flex-direction: column;
      align-items: start;
      .mode-selector__label {
        margin-bottom: 12px;
      }
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

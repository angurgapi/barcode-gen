<template>
  <div class="size-selector f-col">
    <div class="size-selector__buttons">
      <button
        class="btn size-selector__btn"
        :class="{'size-selector__btn--active': currentSize === 'small'}"
        @click="selectSize('small')"
      >
        small
      </button>
      <button
        class="btn size-selector__btn"
        :class="{'size-selector__btn--active': currentSize === 'medium'}"
        @click="selectSize('medium')"
      >
        medium
      </button>
      <button
        class="btn size-selector__btn"
        :class="{'size-selector__btn--active': currentSize === 'large'}"
        @click="selectSize('large')"
      >
        large
      </button>
      <button
        class="btn size-selector__btn"
        :class="{'size-selector__btn--active': currentSize === 'custom'}"
        @click="selectSize('custom')"
      >
        custom
      </button>
    </div>
    <div v-show="currentSize === 'custom'" class="size-selector__inputs">
      <CustomInput v-model="customDimensions[0]" type="number" max-length="4" label="width" postfix="px" />
      <CustomInput v-model="customDimensions[1]" type="number" max-length="4" label="height" postfix="px" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import CustomInput from '@/components/blocks/CustomInput.vue'

@Component({
  components: { CustomInput }
})
export default class SizeSelector extends Vue {
  currentSize = 'small'
  customDimensions = [0, 0]

  sizeModes = {
    small: [150, 30],
    medium: [200, 60],
    large: [400, 100]
  }

  @Watch('customDimensions', { deep: true })
  onInput () {
    this.$emit('input', ...this.dimensions)
  }

  get dimensions (): number[] {
    return this.currentSize === 'custom' ? this.customDimensions : this.sizeModes[this.currentSize]
  }

  selectSize (value:string) {
    this.currentSize = value
    this.$emit('input', ...this.dimensions)
  }
}

</script>

<style lang="scss" scoped>
.size-selector {
    max-width: 100%;
    width: 100%;
    &__buttons {
    background: #fff;
    width: 100%;
    display: grid;
    grid-gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    }

    &__btn {
      cursor: pointer;
        height: 48px;
        border-radius: 8px;
        background: #FFFADE;
        border: 2px solid #F1DF6F;
        color: #111827;
        &:hover {
            background: #fadd8e;
            border: 2px solid #fadd8e;
        }
        &--active {
            background: #F1DF6F;
        }
    }

    &__inputs {
      width: 100%;
      margin-top: 20px;
      // display: flex;
      // justify-content: space-between;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 12px;
    }
}
</style>

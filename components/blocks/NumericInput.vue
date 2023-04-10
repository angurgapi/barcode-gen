<template>
  <div class="input-wrapper">
    <span class="input-wrapper__label">{{ label }}</span>
    <input
      v-model="modelValue"
      type="text"
      :maxlength="maxLength"
      class="input-wrapper__input"
      :class="{'input-wrapper__input--error': error}"
    >
    <span v-if="postfix" class="input-wrapper__postfix">{{ postfix }}</span>
    <span v-if="error" class="input-wrapper__warning">{{ errorText }}</span>
    <button v-if="isClearable && modelValue" class="btn input-wrapper__clear" @click="clearInput">
      <svg-icon name="clear" height="18" width="18" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
@Component

export default class NumericInput extends Vue {
  @Prop({ default: '' }) readonly label?: string
  @Prop({ default: '' }) readonly postfix?: string
  @Prop({ default: 14 }) readonly maxLength?: number
  @Prop({ default: false }) readonly error?: boolean
  @Prop({ default: false }) readonly isClearable?: boolean

  modelValue = ''
  errorText = 'Barcode content must not be empty'

    @Watch('modelValue')
  onInput (value) {
    const sanitizedValue = value.toString().replace(/\D/g, '')
    this.modelValue = sanitizedValue
    this.$emit('input', this.modelValue)
  }

    clearInput () {
      this.modelValue = ''
    }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    background: #fff;
    width: 100%;
    max-width: 100%;
    overflow: hidden;

    &__label {
        font-size: 12px;
        color: #918886;
        position: absolute;
        top: 5px;
        left: 8px;
    }

    &__postfix {
        position: absolute;
        top: 20px;
        right: 8px;
    }
    &__input {
        height: 40px;
        background: #fff;
        font-size: 14px;
        padding: 10px 6px 6px 6px;
        border-radius: 5px;
        outline: none;
        border: 2px solid #918886;
        &:hover, &:focus {
            outline: none;
            border: 2px solid #000;
        }
        &--error {
            border: 2px solid #7a311c;
        }
    }

    &__warning {
        color: #7a311c;
        font-size: 12px;
        margin-top: 5px;
    }

    &__clear {
      height: 20px;
      width: 20px;
      padding: 0;
      position: absolute;
      right: 12px;
      top: 18px;
      svg {
        margin: 0;
      }
    }

}
</style>

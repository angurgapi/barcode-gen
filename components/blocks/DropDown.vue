<template>
  <div class="dropdown">
    <button
      class="dropdown__button"
      :class="{'dropdown__button--rotate': isOpen}"
      @click="isOpen = !isOpen"
    >
      <span class="dropdown__label">{{ label }}</span>
      <svg-icon
        height="16"
        width="16"
        name="chevron-down"
        class="dropdown__arrow"
        :class="{'dropdown__arrow--rotate': isOpen}"
      />
    </button>

    <div v-show="isOpen" class="dropdown__content">
      <ul class="dropdown__list">
        <li
          v-for="option, index in options"
          :key="index"
          class="dropdown__option f-row"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue
} from 'vue-property-decorator'
import {FormatOptionInterface} from '@/utils/interfaces/FormatOptionInterface'

    @Component
    export default class DropDown extends Vue {
        @Prop({ default: () => [] }) readonly options!: FormatOptionInterface[]
        @Prop({ default: '' }) readonly name?: string

        isOpen = false
        selectedOption:FormatOptionInterface = this.options[0]

        get label (): string {
          return this.selectedOption.label || 'label'
        }

        selectOption (option:FormatOptionInterface) {
          this.selectedOption = option
          this.$emit('input', this.selectedOption.value)
          this.isOpen = false
        }
}
</script>

  <style lang="scss" scoped>
  .dropdown {
    position: relative;
    font-weight: 400;
    display: flex;
    align-items: center;
    width: fit-content;
    text-transform: uppercase;

    &__button, &__content {
      background:#fff;
      border-radius: 5px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }

    &__button {
      height: 48px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-transform: uppercase;
      cursor: pointer;
      padding: 6px 21px 6px 12px;
      border: none;
      outline: none;
    }

    &__arrow {
        fill: #000;
    }

    &__label {
      margin: 0 8px;
      white-space: nowrap;
      overflow: hidden;
    }

    &__content {
      position: absolute;
      display: flex;
      flex-direction: column;
      z-index: 20;
      top: 50px;
      padding: 16px 24px;
      width: 100%;
    }

    &__option {
        cursor: pointer;
        height: 30px;
        opacity: .8;
        &:hover {
            opacity: 1;
        }
    }
  }
  </style>

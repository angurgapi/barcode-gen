<template>
  <svg-sprite :class="className" />
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>

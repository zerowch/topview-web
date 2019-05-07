<template>
  <input
  v-model="inputVal"
  onkeypress="return event.keyCode>=48&&event.keyCode<=57"
  type="text">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputVal: this.value
    }
  },
  watch: {
    inputVal (v) {
      this.$emit('input', v)
    }
  }
}
</script>

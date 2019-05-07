<template>
  <div class="input-component">
    <div v-if="icon" class="input-component-icon">
      <email-icon v-if="icon === 'mail'"></email-icon>
      <password-icon v-if="icon === 'pwd'"></password-icon>
      <phone-icon v-if="icon === 'phone'"></phone-icon>
      <msg-icon v-if="icon === 'otp'"></msg-icon>
    </div>
    <numberInput
    v-if="iType === 'number'"
    :type="icon === 'pwd' ? 'password' : 'text'"
    v-model="inputValue"
    class="topview-input"
    :placeholder="placeholder"
    ></numberInput>
    <input
    v-else
    :type="icon === 'pwd' ? 'password' : 'text'"
    v-model="inputValue"
    :placeholder="placeholder"
    class="topview-input">
  </div>
</template>

<script>
// 组件
import EmailIcon from 'vue-material-design-icons/Email.vue'
import PasswordIcon from 'vue-material-design-icons/TextboxPassword.vue'
import PhoneIcon from 'vue-material-design-icons/Cellphone.vue'
import MsgIcon from 'vue-material-design-icons/CellphoneMessage.vue'
import 'vue-material-design-icons/styles.css'
import numberInput from '@/components/NumInput.vue'

export default {
  components: {
    EmailIcon, PasswordIcon, PhoneIcon, numberInput, MsgIcon
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    pre: {
      type: String,
      default: ''
    },
    iType: {
      type: String,
      default: 'normal'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputValue: this.pre
    }
  },
  watch: {
    inputValue (v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style lang="scss">
.input-component {
  position: relative;

  input {
    width: 100%;
    box-sizing: border-box;
  }

  &-icon {
    position: absolute;
    left: 0.8rem;
    top: 0.8rem;
    color: #CACBCC;
  }
}
</style>

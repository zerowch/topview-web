<template>
  <div>
    <SweetModal ref="alertModal" :icon="icon" :title="title">
      {{text}}
    </SweetModal>
  </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'

export default {
  components: {
    SweetModal
  },
  data () {
    return {
      text: '',
      title: '',
      icon: null
    }
  },
  methods: {
    show ({ text, title, icon }) {
      this.text = text || ''
      this.title = title || ''
      this.icon = icon || null
      this.$refs.alertModal.open()
    }
  }
}
</script>

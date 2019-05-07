<template>
  <div>
    <transition name="fade">
      <div v-if="isShow" class="user-alert">
        <div class="user-alert-mask">
          <div class="user-alert-msg-box">
            {{text}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      text: ''
    }
  },
  methods: {
    /*!
     * date 10/18/2018
     * 显示alert
     */
    display (txt, time) {
      if (this.isShow) {
        return false
      }
      this.text = txt
      this.isShow = true
      if (time) {
        return new Promise(resolve => {
          setTimeout(() => {
            this.isShow = false
            resolve(true)
          }, time)
        })
      }
    },
    /*!
     * date 10/18/2018
     * 关闭alert提示
     */
    close () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss">
  .user-alert {
    z-index: 9002;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    &-mask {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    &-msg-box {
      position: relative;
      bottom: 30%;
      padding: 0.7rem 1rem;
      color: #F7F7F7;
      text-align: center;
      border-radius: 0.4rem;
      background: {
        color: rgba(0, 0, 0, 0.7)
      }
    }
  }

  // 动画
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

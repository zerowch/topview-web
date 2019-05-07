<template>
  <div class="input-outter">
    <div class="norm-input">
      <div class="inner-box">
        <i
          v-if="icon"
          :class="{
            'lay-down': iconLay
          }"
          :style="{
            'background-image': `url(${icon})`
          }"
        ></i>
        <select v-if="isAreaCode" v-model="areaCode">
          <option
            v-for="(area, index) in areaList"
            :key="index"
            :value="area.mobilePrefix"
          >+{{area.mobilePrefix}}</option>
        </select>
        <input
          v-model="inputValue"
          :type="type"
          :placeholder="placeholder"
        >
        <span
          class="send-code-btn"
          v-if="sendCode"
          @click="clickSend"
        >
          {{btnText}}
        </span>
      </div>
    </div>
    <div
      class="tips"
      v-if="tips"
    >
      <p>{{tips}}</p>
    </div>
  </div>
</template>

<script>
// 工具
import { getAreaCode } from '@/utils/getAreaCode'

export default {
  name: 'NormInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconLay: {
      type: Boolean,
      default: false
    },
    sendCode: {
      type: Boolean,
      default: false
    },
    isAreaCode: {
      type: Boolean,
      default: false
    },
    tips: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: 'button'
    }
  },
  data () {
    return {
      areaCode: NaN,
      areaList: []
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  async created () {
    if (this.isAreaCode) {
      let areaList = await getAreaCode()
      this.areaList = areaList
      this.areaCode = areaList[0].mobilePrefix
    }
  },
  methods: {
    clickSend () {
      this.$emit('clickSend')
    },
    getAreaCode () {
      return this.areaCode
    }
  }
}
</script>

<style lang="scss">
  .input-outter {
    width: 100%;
    box-sizing: border-box;
    &:not(:last-of-type) {
      .inner-box {
        border-bottom: 1px solid #DCDDDE;
      }
    }
    .tips {
      p {
        padding: 0 1rem;
        margin: 0.5rem 0;
        color: #9D9E9E;
        text-align: justify;
      }
    }
  }
  .norm-input {
    box-sizing: border-box;
    padding-left: 1rem;
    width: 100%;
    background-color: #fff;
    i {
      $size: 1.5rem;
      width: $size;
      height: $size;
      margin-right: 0.3rem;
      background: {
        size: auto 90%;
        position: center center;
        repeat: no-repeat;
      }
      &.lay-down {
        background: {
          size: 90% auto;
        }
      }
    }
    .inner-box {
      display: flex;
      align-items: center;
    }
    input {
      flex-grow: 1;
      margin-left: 0.7rem;
      line-height: 3rem;
      border: 0;
      &:focus {
        outline: none;
      }
    }
    .send-code-btn {
      position: absolute;
      right: 0.5rem;
      padding: 0.5rem;
      background-color: #fff;
      &:active {
        opacity: 0.7;
      }
    }
  }

  .active-send .send-code-btn {
    color: #E83D3D;
    text-decoration: underline;
  }
</style>

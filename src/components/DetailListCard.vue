<template>
  <div class="detail-listcard">
    <div class="detail-listcard-playicon"></div>
    <div class="detail-listcard-title">
      {{title}}
    </div>
    <div class="detail-listcard-ctrl">
      preview
    </div>
    <!-- <div class="detail-listcard-time">
      03:54
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    track: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    pic: {
      type: String,
      default: ''
    },
    tid: {
      type: String,
      default: ''
    },
    rid: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: NaN
    },
    chapterName: {
      type: String,
      default: ''
    },
    isBought: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/mixin';
  .detail-listcard {
    display: flex;
    padding: 15px 20px;
    user-select: none;

    &:active {
      background-color: #f5f5f5;
    }

    &-playicon {
      @include square(16px);
      margin-left: 20px;
      margin-right: 20px;
      background: {
        image: url(../assets/play_icon.png);
        size: 100%;
        position: center;
        repeat: no-repeat;
      }
    }

    &-title {
      flex-grow: 1;
    }
    &-ctrl {
      padding: 0 15px;
    }
  }
</style>

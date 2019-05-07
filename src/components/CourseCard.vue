<template>
  <div class="course-outside">
    <div class="course">
      <div class="course-pic">
        <img :src="pic" alt="">
      </div>
      <div class="course-desc">
        <h5>{{title}}</h5>
        <p>created by {{author}}</p>
        <div class="course-panel">
          <div class="course-price">
            {{price}}T
          </div>
          <div class="disc-count">
            <i></i> {{bbsTotal}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 默认插图
import defaultPic from '@/assets/placeholder500x500.png'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    pic: {
      type: String,
      default: defaultPic
    },
    author: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    bbsTotal: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/mixin';
  .course {
    width: 100%;
    margin-bottom: 1rem;
    break-inside: avoid;
    box-shadow: 0 0 1px 1px rgba(20 , 23 , 28, .1),
    0 3px 1px 0 rgba(20, 23, 28, .1);
    transition: 0.7s all;
    // padding-bottom: 15px;
    // border-bottom: 10px solid transparent;

    &:hover {
      box-shadow: 0 0 10px 5px rgba(20 , 23 , 28, .1),
      0 3px 1px 0 rgba(20, 23, 28, .1);
    }

    // &-outside {
    //   padding-bottom: 1rem;
    // }

    &-pic {
      img {
        width: 100%;
      }
    }

    &-desc {
      padding: 15px 10px 10px 15px;
      h5 {
        overflow: hidden;
        font-size: 15px;
        color: #29303b;
        margin: 0;
        margin-bottom: 10px;
      }

      p {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #686f7a;
        margin-bottom: 10px;
      }

    }

    &-panel {
      display: flex;
      justify-content: space-between;
    }
    &-price {
      font-weight: bold;
    }
  }

  .disc-count {
    display: flex;
    align-items: center;
    color: #686f7a;
    font-size: 12px;

    i {
      display: block;
      @include square(18px);
      background: {
        image: url(../assets/comment.png);
        size: 80%;
        repeat: no-repeat;
      }
    }
  }
</style>

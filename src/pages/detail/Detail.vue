<template>
  <div>
    <top-header />
    <div class="detail-title">
      <div class="detail-title-inner base-max-width-s">
        <div class="detail-buy-window">
          <div class="detail-buy-window-position">
            <div class="detail-buy-window-preview">
              <img :src="pic" alt="">
            </div>
            <div class="detail-buy-window-price">
              <p>₹ {{price}}</p>
              <div class="detail-buy-window-btn btn gap-bottom">
                Buy Now
              </div>
              <div @click="playTrial" class="detail-buy-window-btn btn">
                Trial
              </div>
            </div>
          </div>
        </div>

        <div class="detail-title-box base-max-width-xs">
          <div class="detail-title-font">
            {{title}}
          </div>
          <div class="detail-title-others">
            <div class="detail-title-comments">
              <i></i> {{bbsTotal}}
            </div>
            <div class="detail-title-creator">
              Author <span>{{author}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-container base-max-width-s">
      <div class="base-max-width-xs">

        <div class="detail-desc">
          <div class="detail-desc-title block-title">
            Introduction
          </div>
          <div class="detail-desc-content">{{intro}}</div>
        </div>

        <div class="detail-list">
          <div class="detail-list-title block-title">
            <div class="list-title">
              Course List
            </div>
          </div>
          <div class="detail-list-content">
            <div class="list">
              <detail-list-card
                v-for="(item, index) in list"
                :key="index"
                v-bind="{
                  title: item.resourceTaget
                }"
                @click.native="playChapter(index)"
              />
            </div>
          </div>
        </div>

      </div>
    </div>

    <JustAudio
      ref="jAudio"
      v-bind="{
        url: ''
      }"
    ></JustAudio>
  </div>
</template>
<script>
// 组件
import TopHeader from '@/components/Header'
import DetailListCard from '@/components/DetailListCard'
import JustAudio from '@/components/JustAudio'
// 公共样式
import '@/styles/base.scss'
// 工具
import { getQuery } from '@/utils/query.js'
import request from '@/utils/request.js'
// 静态资源
import picUrl from '@/assets/placeholder500x500.png'

export default {
  components: {
    TopHeader, DetailListCard, JustAudio
  },
  data () {
    return {
      rid: getQuery('rid'),
      title: '',
      author: '',
      bbsTotal: '',
      pic: picUrl,
      price: '',
      intro: '',
      trialUrl: '',
      list: [],
      playList: []
    }
  },
  created () {
    // this.rid = this.$route
    request.get('web/resource!resourceDetal', {
      rid: this.rid
    }).then(res => {
      let resData = res.data.data
      this.title = resData.resource.resourceTitle
      this.author = resData.resource.resourceAuthor
      this.bbsTotal = resData.resource.resourceBBSTotal
      this.pic = resData.resource.resourceBgpic
      this.price = resData.resource.resourceSellPrice
      this.intro = resData.resource.resourceDesc
      this.list = resData.resource.resourceDetails
      this.trialUrl = resData.resource.resourceUrl

      this.list.forEach(v => {
        this.playList.push({
          name: v.resourceTaget,
          pic: this.pic,
          url: v.resourceUrl
        })
      })
    })
  },
  methods: {
    playTrial () {
      this.$refs.jAudio.setPlaylist(
        [{
          name: 'trial-name',
          url: this.trialUrl,
          pic: this.pic
        }]
      )
    },
    playChapter (index) {
      this.$refs.jAudio.setPlaylist(
        this.playList, index
      )
    }
  }
}
</script>

<style lang="scss">
  @import '../../styles/mixin';
  .block-title {
    margin-bottom: 18px;
    color: #29303b;
    font-weight: bold;
    font-size: 24px;
  }

  .detail {
    &-title {
      @include clear-both;
      height: 330px;
      background-color: #29303b;
      color: #fff;

      &-box {
        margin-top: 68px;
      }

      &-font {
        margin-bottom: 10px;
        font-size: 27px;
        font-weight: bold;
      }

      &-others {
        display: flex;
      }

      &-creator {
        color: #ccc;
        span {
          color: #fff;
          font-weight: bold;
        }
      }

      &-comments {
        margin-right: 20px;
        i {
          display: inline-block;
          vertical-align: -3px;
          @include square(18px);
          background: {
            image: url(../../assets/detail_comment.png);
            size: 100%;
            position: center;
            repeat: no-repeat;
          }
        }
      }
    }

    &-desc {
      padding: 12px;
      margin-top: 40px;
      border: 1px solid #dedfe0;
      background-color: #fafafa;

      &-content {
        text-align: justify;
        line-height: 20px;
        font-size: 14px;
        color: #29303b;
      }
    }

    &-list {
      margin-top: 40px;
      padding-bottom: 20px;
      &-content {
        border: 1px solid #e8e9eb;
        .list > div:not(:last-of-type) {
          border-bottom: 1px solid #e8e9eb;
        }
      }
    }

    &-buy-window {
      position: relative;
      float: right;
      width: 360px;

      &-position {
        position: fixed;
        width: 360px;
        padding: 4px;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        background-color: #fff;
      }

      &-preview {
        img {
          width: 100%;
        }
      }

      &-price {
        padding: 24px;
        margin: auto;

        p {
          margin: 0;
          margin-bottom: 10px;
          text-align: center;
          font-weight: bold;
          font-size: 30px;
          color: #505763;
        }
      }

      &-btn {
        width: 100%;
        line-height: 40px;
        text-align: center;
      }
    }
  }
</style>

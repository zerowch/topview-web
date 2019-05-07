<template>
  <div>
    <top-header />
    <div class="banner">
      <swiper v-if="banner.length > 0" :options="swiperOption">
        <swiperSlide v-for="(slide, index) in banner" :key="index">
          <img :src="slide.resourceBgpic" alt="">
        </swiperSlide>
      </swiper>
    </div>
    <div class="course-list base-max-width">
      <a
        v-for="(res, index) in resourceList"
        :key="index"
        :href="`/detail?rid=${res.rid}`"
      >
        <course-card
          v-bind="{
            title: res.resourceTitle,
            pic: res.resourceBgpic,
            author: res.resourceAuthor,
            price: res.resourceSellPrice,
            bbsTotal: res.resourceBBSTotal
          }"
        />
      </a>

      <div class="course-list-bottom"></div>
    </div>
  </div>
</template>
<script>
// 工具
import request from '@/utils/request' // 用户工具
// 组件
import TopHeader from '@/components/Header'
import CourseCard from '@/components/CourseCard'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 公共样式
import '@/styles/base.scss'
// mixins
import mixin from '@/mixins/common'

export default {
  mixins: [mixin],
  components: {
    TopHeader,
    CourseCard,
    swiper,
    swiperSlide
  },
  data () {
    return {
      banner: [],
      resourceList: [],
      swiperOption: {
        autoplay: {
          delay: 2000
        },
        loop: true
      }
    }
  },
  methods: {
    init () {
      this.getBanner()
    },
    getBanner () {
      request.get('web/index!bannerAll')
        .then(res => {
          let resData = res.data
          this.banner = resData.data.banner
          this.resourceList = resData.data.resourceList
        })
    }
  }
}
</script>

<style lang="scss">
  .banner {
    img {
      width: 100%;
    }
  }

  .course-list {
    column-count: 6;
    column-fill: balance;
    padding: {
      top: 1rem;
      bottom: 1rem;
    }
    &-bottom {
      column-span: all;
      height: 1rem;
    }
  }
</style>

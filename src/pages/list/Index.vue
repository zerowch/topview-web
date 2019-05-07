<template>
  <div>
    <top-header />
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
    </div>
    <div class="base-max-width">
      <paginate
        class="pagination"
        :page-count="pageCount"
        :click-handler="paginate"
        :prev-text="'Prev'"
        :next-text="'Next'"
      >
      </paginate>
    </div>
  </div>
</template>
<script>
// 工具
import request from '@/utils/request' // 用户工具
// 组件
import TopHeader from '@/components/Header'
import CourseCard from '@/components/CourseCard'
import 'swiper/dist/css/swiper.css'
import Paginate from 'vuejs-paginate'
// 公共样式
import '@/styles/base.scss'
// mixins
import mixin from '@/mixins/common'

export default {
  mixins: [mixin],
  components: {
    TopHeader,
    CourseCard,
    Paginate
  },
  data () {
    return {
      resourceList: [],
      page: 0,
      total: 0
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.total / 10)
    }
  },
  methods: {
    init () {
      this.getList(this.page)
    },
    async getList (page) {
      let listData = await this.getListPage(page)
      if (listData.code === '100') {
        this.resourceList = listData.data.resourceList
        this.total = listData.total
      }
    },
    async getListPage (page) {
      let res = await request.get('app/Index!resourceListPage', {
        thisPage: page
      })
      return res.data
    },
    paginate (v) {
      this.page = v - 1
      this.getList(this.page)
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
    display: flex;
    flex-wrap: wrap;

    padding: {
      top: 1rem;
      bottom: 1rem;
    }
    &-bottom {
      column-span: all;
      height: 1rem;
    }

    > * {
      width: calc(100% / 6);
      padding: 5px 10px;
      box-sizing: border-box;
    }
  }
</style>

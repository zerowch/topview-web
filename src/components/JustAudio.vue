<template>
  <div class="just-audio">
    <div class="just-audio-self">
      <!-- 展示信息以及操作 -->
      <div class="just-audio-ctrl">
        <!-- canplay: {{player.canPlay}} <br>
        status: {{player.audioToggle ? 'stop' : 'playing'}} <br> -->
        <div class="just-audio-ctrl-prev" @click="playPrev"></div>
        <div
          class="just-audio-ctrl-play"
          :class="{'just-audio-ctrl-pause': !player.audioToggle}"
          @click="playToggle"
        ></div>
        <div class="just-audio-ctrl-next" @click="playNext"></div>
      </div>
      <div class="just-audio-details">
        <div class="just-audio-details-text">
          <div>{{selcetedTrack.name || 'No Course'}}</div>
          <div>{{stampToTime(player.nowDuration)}}</div>
        </div>
        <div class="just-audio-progress-bar">
          <div class="just-audio-progress-background" v-progressMove="'bar'">
            <div
              v-progressMove="'bar'"
              :style="{
                width: barLength + '%'
              }"
              class="just-audio-progress-now"
              :class="{'just-audio-progress-animate': !player.barDragging}"
            ></div>
          </div>
          <!-- <div :style="{
              left: barLength + '%'
            }"
            class="just-audio-progress-spot"
            :class="{'just-audio-progress-animate': !player.barDragging}"
            v-progressMove
          ></div> -->
        </div>
      </div>
      <div class="just-audio-ctrl2">
        <div class="just-audio-volume">
          <input type="range" min="0" max="100" v-model="player.voice">
          <div
            class="just-audio-volume-bar"
            :style="{
              width: player.voice + '%'
            }"
          ></div>
        </div>
      </div>
      <!-- <div>
        <table border="true">
          <tr>
            <td>img</td><td>name</td><td>url</td>
          </tr>
          <tr
            v-for="(item, index) in list"
            :key="index"
            :style="{
              'background-color': playIndex === index ? '#ccc' : 'white'
            }"
            @click="playSelect(index)"
          >
            <td><img width="50" :src="item.pic" alt=""></td>
            <td>{{item.name}}</td>
            <td>{{item.url}}</td>
          </tr>
        </table>
      </div> -->
      <!-- ↑ -->
      <!-- 音频对象 -->
    </div>
    <div class="just-audio-placeholder"></div>
    <audio
      ref="jAudio"
      id="just-audio"
      :src="audioUrl"
    ></audio>
  </div>
</template>

<script>
import { stampToTime } from '@/utils/time.js'

// ios不自动播放
// function audioAutoPlay (targetAudio) {
//   let play = function () {
//     targetAudio.play()
//     document.removeEventListener('touchstart', play, false)
//   }
//   targetAudio.play()
//   document.addEventListener('WeixinJSBridgeReady', function () {
//     play()
//   }, false)
//   document.addEventListener('YixinJSBridgeReady', function () {
//     play()
//   }, false)
//   document.addEventListener('touchstart', play, false)
// }

export default {
  data () {
    return {
      audioHTML: null,
      player: {
        audioToggle: true,
        duration: null,
        barLength: 0,
        nowDuration: 0,
        barDragging: false,
        canPlay: false, // 音频是否可播放状态
        loadedPlay: false, // 是否加载完成马上播放
        voice: 100
      },
      list: [],
      playIndex: 0
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selcetedTrack () { // 选中的音频媒体对象
      return this.list[this.playIndex] || ''
    },
    prevTrack () {
      return this.list[this.playIndex - 1] || ''
    },
    nextTrack () {
      return this.list[this.playIndex + 1] || ''
    },
    audioUrl () {
      if (this.selcetedTrack) {
        return this.selcetedTrack.url
      } else {
        return ''
      }
    },
    barLength () {
      let returnData = this.player.nowDuration * 100 / this.player.duration
      returnData = returnData > 100 ? 100 : returnData
      returnData = returnData < 0 ? 0 : returnData
      return returnData
    }
  },
  directives: {
    progressMove: {
      inserted (el, binding, vnode) {
        let progressBar = el.parentNode
        let vm = vnode.context
        let barWidth
        let originPos
        let originLength
        el.addEventListener('mousedown', e => {
          if (!vm.player.canPlay) {
            return false
          }
          barWidth = progressBar.clientWidth
          vm.player.barDragging = true
          if (binding.value === 'bar') {
            // 如果拖动进度条
            vm.player.nowDuration = (e.offsetX / barWidth) * vm.player.duration
          }

          // 记录原来的位置
          originPos = e.clientX
          originLength = vm.barLength
        })
        document.addEventListener('mouseup', e => {
          if (vm.player.barDragging) {
            vm.audioHTML.currentTime = vm.player.nowDuration
            vm.player.barDragging = false
          }
        })
        document.addEventListener('mousemove', e => {
          if (vm.player.barDragging) {
            let newPos = e.clientX
            let offsetX = newPos - originPos
            let offsetXPecent = offsetX / barWidth * 100
            vm.player.nowDuration =
            (originLength + offsetXPecent) /
            100 * vm.player.duration
          }
        })
      }
    }
  },
  methods: {
    stampToTime,
    audioInit () { // 初始化播放器
      this.audioHTML = this.$refs.jAudio

      this.audioHTML.addEventListener('canplay', () => {
        // 音频可播放状态
        this.player.duration = this.audioHTML.duration
        this.player.canPlay = true
        this.audioHTML.volume = this.player.voice / 100
        if (this.player.loadedPlay) {
          this.player.loadedPlay = false
          this.audioHTML.play()
        }
      })
      this.audioHTML.addEventListener('ended', () => {
        // 监听播放结束
        this.player.audioToggle = true
        if (this.nextTrack) { // 如果列表有下一个音频自动播放
          this.player.loadedPlay = true
          this.playIndex += 1
        }
      })
      this.audioHTML.addEventListener('timeupdate', () => {
        // 监听音乐时间刷新
        // 修改目前的播放时长
        if (!this.player.barDragging) { // 判断是否正在拖动进度条
          // 更新时间
          this.player.nowDuration = this.audioHTML.currentTime
        }
      }, true)
      this.audioHTML.addEventListener('playing', () => {
        // 监听媒体开始播放
        this.player.audioToggle = false
      })
      this.audioHTML.addEventListener('pause', () => {
        // 监听媒体暂停播放
        this.player.audioToggle = true
      })
    },
    playToggle () {
      if (!this.player.canPlay) {
        return false
      }
      if (this.player.audioToggle) {
        this.audioHTML.play()
      } else {
        this.audioHTML.pause()
      }
    },
    playNext () {
      if (this.nextTrack) {
        this.player.loadedPlay = true
        this.playIndex += 1
      }
    },
    playPrev () {
      if (this.prevTrack) {
        this.player.loadedPlay = true
        this.playIndex -= 1
      }
    },
    playSelect (index) {
      this.player.loadedPlay = true
      this.playIndex = index
    },
    setDuration (progress) {
      this.audioHTML.currentTime = progress * this.player.duration / 100
    },
    setPlaylist (arr, index = 0, cover = true, playNow = true) {
      this.player.canPlay = false
      if (playNow) {
        // 加载后自动播放
        this.player.loadedPlay = true
      }
      if (playNow && !cover) {
        this.playIndex = this.list.length + index
      } else {
        this.playIndex = 0 + index
      }
      if (cover) {
        this.list = arr
      } else {
        this.list.push(...arr)
      }
      this.audioHTML.load() // 重新加载
    }
  },
  mounted () {
    this.audioInit()
  },
  watch: {
    'player.voice': {
      handler: function (val) {
        if (this.player.canPlay) {
          this.audioHTML.volume = val / 100
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/components/justAudio';
</style>

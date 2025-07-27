<template>
  <div class="ziben-home">
    <!-- <audio ref="bgm" :src="bgmSrc" loop autoplay style="display: none" /> -->
    <div v-if="stage === 'home'" class="ziben-card">
      <div class="ziben-title">资本做局器</div>
      <div class="ziben-btns">
        <el-button type="primary" size="large" @click="startGame">开始做局</el-button>
        <el-button size="large" @click="failExit">退出</el-button>
      </div>
    </div>
    <div v-else-if="stage === 'progress'" class="ziben-card">
      <div class="ziben-title">资本做局器</div>
      <div class="ziben-progress-label">做局进度</div>
      <el-progress
        :percentage="progress"
        :show-text="true"
        :stroke-width="16"
        color="#7a6ff0"
        style="width: 80%; margin: 0 auto 16px"
      />
      <div class="ziben-progress-desc">{{ progressText }}</div>
    </div>
    <div v-else-if="stage === 'fail'" class="ziben-card fail">
      <el-icon style="font-size: 48px; color: #ff4d4f"><Close /></el-icon>
      <div class="ziben-title fail">无法退出</div>
      <div class="ziben-desc">资本的力量不允许你轻易逃脱</div>
      <el-button type="default" size="large" @click="backHome">返回</el-button>
    </div>
    <div v-else-if="stage === 'success'" class="ziben-card success">
      <div class="ziben-success-icon">🥳</div>
      <div class="ziben-title">恭喜！做局成功！</div>
      <div class="ziben-desc">
        你的时间成功被资本浪费了 <span class="ziben-time">{{ usedTime }}秒</span>
      </div>
      <div class="ziben-msg">🎉 资本家笑了，韭菜哭了</div>
      <div class="ziben-btns">
        <el-button type="primary" size="large" @click="backHome">再来一次</el-button>
        <el-button type="danger" size="large" @click="showShare">分享给朋友</el-button>
      </div>
    </div>
    <el-dialog v-model="shareDialog" title="dopplerxd.fun 显示" width="350px" :show-close="false" center>
      <div style="font-size: 16px; line-height: 2">
        <span style="font-size: 22px">🥳</span> 分享文本：<br />
        <span style="color: #555">“资本做局器”你敢来挑战吗？</span><br />
        <span style="color: #409eff">https://dopplerxd.fun/ziben/</span><br />
        快去分享给你的朋友们吧！
      </div>
      <template #footer>
        <el-button type="primary" @click="shareDialog = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

const stage = ref('home')
const progress = ref(0)
const progressText = ref('正在准备资本布局...')
const usedTime = ref(0)
const shareDialog = ref(false)
// const bgmSrc = require('@/assets/bgm/ziben.mp3')
const progressTexts = [
  '正在准备资本布局...',
  '正在分析市场情况...',
  '正在招募关键人物...',
  '正在制定操盘策略...',
  '正在实施最终计划...',
  '做局即将完成...',
]
let progressTimer = null
let timeTimer = null

const startGame = () => {
  stage.value = 'progress'
  progress.value = 0
  usedTime.value = 0
  progressText.value = progressTexts[0]
  runProgress()
  timeTimer = setInterval(() => {
    usedTime.value++
  }, 1000)
}

function runProgress() {
  let idx = 0
  progressTimer = setInterval(
    () => {
      let step = Math.floor(Math.random() * 8) + 2 // 2~9
      progress.value = Math.min(progress.value + step, 100)
      if (progress.value >= 100) {
        clearInterval(progressTimer)
        clearInterval(timeTimer)
        setTimeout(() => {
          stage.value = 'success'
        }, 600)
      } else {
        if (progress.value > 90) idx = 5
        else if (progress.value > 75) idx = 4
        else if (progress.value > 55) idx = 3
        else if (progress.value > 35) idx = 2
        else if (progress.value > 15) idx = 1
        else idx = 0
        progressText.value = progressTexts[idx]
      }
    },
    Math.floor(Math.random() * 400) + 300,
  )
}

const failExit = () => {
  stage.value = 'fail'
}
const backHome = () => {
  stage.value = 'home'
  progress.value = 0
  usedTime.value = 0
  progressText.value = progressTexts[0]
}
const showShare = () => {
  shareDialog.value = true
  copyShare()
}
function copyShare() {
  const text = '“资本做局器”你敢来挑战吗？\nhttps://dopplerxd.fun/ziben/'
  navigator.clipboard.writeText(text)
  ElMessage.success('已复制到剪贴板！')
}
onMounted(() => {
  const audio = document.querySelector('audio')
  if (audio) {
    audio.play().catch(() => {})
  }
})
</script>

<style scoped>
.ziben-home {
  min-height: calc(100vh - 60px);
  background: #f5f6fa url('https://img.zcool.cn/community/01b6e95e3f1e2fa801216518a8e2e8.jpg')
    center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ziben-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
  padding: 48px 36px 36px 36px;
  min-width: 350px;
  text-align: center;
  position: relative;
}
.ziben-title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #7a6ff0;
  margin-bottom: 24px;
}
.ziben-btns {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 24px;
}
.ziben-progress-label {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #555;
}
.ziben-progress-desc {
  margin-top: 12px;
  font-size: 1.1rem;
  color: #888;
  font-style: italic;
}
.ziben-card.fail {
  background: #ffeded;
  color: #ff4d4f;
}
.ziben-title.fail {
  color: #ff4d4f;
}
.ziben-desc {
  margin: 18px 0 24px 0;
  font-size: 1.1rem;
}
.ziben-card.success {
  background: #fffbe6;
}
.ziben-success-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}
.ziben-time {
  color: #fa541c;
  font-weight: bold;
}
.ziben-msg {
  margin: 10px 0 24px 0;
  color: #7a6ff0;
  font-size: 1.1rem;
}
</style>

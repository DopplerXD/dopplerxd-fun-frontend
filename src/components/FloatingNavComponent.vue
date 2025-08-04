<template>
  <div class="floating-nav" @mouseenter="showNav = true" @mouseleave="showNav = false">
    <div class="nav-toggle" :class="{ 'nav-active': showNav }">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="nav-menu" :class="{ 'nav-menu-active': showNav }">
      <div class="nav-item" @click="navigateTo('/deepsleep')">DeepSleep</div>
      <div class="nav-item" @click="navigateTo('/guessandguess/home')">小游戏</div>
      <div class="nav-item" @click="navigateTo('/ziben')">资本模拟器</div>
      <div class="nav-item" @click="navigateTo('/eat-what')">今天吃什么</div>
      <div class="nav-item" @click="navigateTo('https://www.dopplerxd.site')">我的博客</div>
      <div class="nav-item" @click="navigateTo('https://www.dopplerxd.site')">我的文档站</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const showNav = ref(false)

const navigateTo = (path) => {
  if (path.startsWith('http')) {
    window.open(path, '_blank')
  } else {
    router.push(path)
  }
}
</script>

<style scoped>
/* 悬浮导航栏样式 */
.floating-nav {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 1000;
}

.nav-toggle {
  width: 24px;
  height: 40px;
  background-color: #409eff;
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
}

.nav-active {
  background-color: #337ecc;
}

.nav-menu {
  background-color: #409eff;
  border-radius: 4px 0 0 4px;
  overflow: hidden;
  max-width: 0;
  transition: max-width 0.3s ease;
}

.nav-menu-active {
  max-width: 200px;
}

.nav-item {
  padding: 12px 20px;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

.nav-item:hover {
  background-color: #337ecc;
}
</style>

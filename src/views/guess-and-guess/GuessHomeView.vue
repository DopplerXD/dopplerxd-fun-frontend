<template>
  <div class="home-view">
    <el-button type="info" size="large" round @click="showCountryContinentInfoDialog = true">
      地区说明
    </el-button>
    <el-button type="primary" size="large" round @click="$router.push('/guessandguess/play')">
      单人游戏
    </el-button>
    <el-button type="danger" size="large" round @click="$router.push('/guessandguess/multiplay')" disabled>
      多人游戏（待开发）
    </el-button>

    <!-- 地区说明弹窗 -->
    <el-dialog v-model="showCountryContinentInfoDialog" width="45%">
      <div class="markdown-content" v-html="mdContent"></div>
      <template #footer>
        <el-button @click="showCountryContinentInfoDialog = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { marked} from 'marked'
import countryContinentInfo from '@/assets/country_continent_info.md?url'

// 控制弹窗显示隐藏
const showCountryContinentInfoDialog = ref(false)

// 加载并解析 Markdown 文件
const mdContent = ref('')

// 异步加载 Markdown 文件内容
fetch(countryContinentInfo)
  .then(res => res.text())
  .then(text => {
    mdContent.value = marked.parse(text)
  })
  .catch(err => {
    mdContent.value = '无法加载地区说明文件。'
    console.error('加载 Markdown 文件失败:', err)
  })
</script>

<style scoped>
.home-view {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  height: 70vh;
}
</style>

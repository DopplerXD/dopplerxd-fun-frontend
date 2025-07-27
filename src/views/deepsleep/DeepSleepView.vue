<template>
  <div class="deepsleep-container">
    <!-- 主要内容 -->
    <div class="main-content">
      <div class="logo-container">
        <img src="@/assets/deepsleep.jpg" alt="DeepSleep Logo" class="logo" />
      </div>
      
      <div class="input-container">
        <el-input 
          v-model="username" 
          placeholder="请输入您的名字" 
          class="username-input"
          @keyup.enter="startChat"
        />
        <el-button 
          type="primary" 
          circle 
          class="start-button" 
          @click="startChat"
        >
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const username = ref('')

const startChat = () => {
  if (username.value.trim()) {
    // 将用户名存储在本地，以便在聊天页面使用
    localStorage.setItem('deepsleep_username', username.value.trim())
    router.push('/deepsleep/chat')
  } else {
    ElMessage.warning('请输入您的名字')
  }
}


</script>

<style scoped>
.deepsleep-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: #f5f7fa;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
}

.logo-container {
  margin-bottom: 60px;
}

.logo {
  width: 300px;
  height: auto;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 24px;
  padding: 8px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.username-input {
  flex: 1;
  border: none;
}

.username-input :deep(.el-input__wrapper) {
  box-shadow: none !important;
  padding-right: 0;
}

.start-button {
  margin-left: 8px;
}


</style>
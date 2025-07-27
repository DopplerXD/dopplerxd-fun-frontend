<template>
  <div class="chat-container">
    <!-- 聊天界面 -->
    <div class="chat-interface">
      <div class="chat-header">
        <img src="@/assets/deepsleep.jpg" alt="DeepSleep Logo" class="chat-logo" />
        <div class="chat-title">DeepSleep</div>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div v-if="messages.length === 0" class="welcome-message">
          <p>欢迎使用 DeepSleep，{{ username }}！</p>
          <p>我可能正在睡觉，但您可以尝试和我聊天...</p>
        </div>

        <div v-for="(message, index) in messages" :key="index" class="message-container">
          <div :class="['message', message.isUser ? 'user-message' : 'ai-message']">
            <div class="message-sender">{{ message.isUser ? username : 'DeepSleep' }}</div>
            <div class="message-content">{{ message.content }}</div>
          </div>
        </div>
      </div>

      <div class="chat-input-container">
        <el-input
          v-model="userInput"
          placeholder="输入您的消息..."
          class="chat-input"
          @keyup.enter="sendMessage"
        />
        <el-button type="primary" class="send-button" @click="sendMessage">
          <el-icon><ArrowRight /></el-icon> 发送
        </el-button>
        <el-button type="danger" class="clear-button" @click="clearMessages">
          <el-icon><Delete /></el-icon> 清屏
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Delete } from '@element-plus/icons-vue'
import responses from '@/assets/deepsleep_response.json'

const router = useRouter()
const username = ref('用户')
const userInput = ref('')
const messages = ref([])
const messagesContainer = ref(null)

onMounted(() => {
  // 从本地存储获取用户名
  const storedUsername = localStorage.getItem('deepsleep_username')
  if (storedUsername) {
    username.value = storedUsername
  }
})

// 监听消息列表变化，自动滚动到底部
watch(messages, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}, { deep: true })

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  // 添加用户消息
  messages.value.push({
    isUser: true,
    content: userInput.value
  })

  // 清空输入框
  const userMessage = userInput.value
  userInput.value = ''

  // 模拟AI思考
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 从预设回复中随机选择一条
  const randomIndex = Math.floor(Math.random() * responses.length)
  const aiResponse = responses[randomIndex].response

  // 添加AI回复
  messages.value.push({
    isUser: false,
    content: aiResponse
  })
}

const clearMessages = () => {
  // 清空所有消息
  messages.value = []
}
</script>

<style scoped>
.chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.chat-interface {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 80vh;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
  background-color: #f9f9f9;
}

.chat-logo {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.chat-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.welcome-message {
  text-align: center;
  color: #888;
  margin: 40px 0;
}

.message-container {
  margin-bottom: 16px;
}

.message {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
}

.user-message {
  background-color: #e6f7ff;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.ai-message {
  background-color: #f2f2f2;
  margin-right: auto;
  border-bottom-left-radius: 4px;
}

.message-sender {
  font-size: 12px;
  margin-bottom: 4px;
  color: #666;
}

.message-content {
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.chat-input-container {
  display: flex;
  padding: 16px;
  border-top: 1px solid #eaeaea;
  background-color: #f9f9f9;
}

.chat-input {
  flex: 1;
}

.send-button {
  margin-left: 12px;
}

.clear-button {
  margin-left: 8px;
}
</style>
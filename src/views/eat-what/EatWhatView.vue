<template>
  <div class="eat-what-container">
    <h1 class="title">今天吃什么？</h1>

    <div class="word-cloud-container" ref="cloudContainer">
      <div
        v-for="(item, index) in displayFoods"
        :key="index"
        class="food-item"
        :class="{ 'selected-food': selectedIndex === index }"
        :style="getItemStyle(item, index)"
      >
        {{ item }}
      </div>
    </div>

    <div class="result-container" v-if="showResult" @click.self="closeResult">
      <div class="result-box">
        <div class="close-btn" @click="closeResult">×</div>
        <div class="result-text">{{ selectedFood }}</div>
      </div>
    </div>

    <el-button
      type="primary"
      size="large"
      class="action-button"
      @click="startSelection"
      :disabled="isSelecting"
    >
      {{ buttonText }}
    </el-button>
  </div>

  <FloatingNavComponent />
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import foodData from './food-data.json'
import FloatingNavComponent from '@/components/FloatingNavComponent.vue'

// 状态变量
const isSelecting = ref(false)
const showResult = ref(false)
const selectedIndex = ref(-1)
const selectedFood = ref('')
const cloudContainer = ref(null)
const displayFoods = ref([])
const animationSpeed = ref(50) // 动画速度，数值越小越快

// 计算属性
const buttonText = computed(() => {
  return isSelecting.value ? '选择中...' : '今天吃什么？'
})

// 生命周期钩子
onMounted(() => {
  initFoods()
  // 初始化时分散词云
  setTimeout(() => {
    distributeItems()
  }, 100)
})

// 初始化食物列表
const initFoods = () => {
  // 从食物数据中随机选择 20 个食物显示在词云中，减少数量以避免拥挤
  const shuffled = [...foodData.foods].sort(() => 0.5 - Math.random())
  displayFoods.value = shuffled.slice(0, 20)
}

// 分散词云项
const distributeItems = () => {
  if (!cloudContainer.value) return

  const containerWidth = cloudContainer.value.offsetWidth
  const containerHeight = cloudContainer.value.offsetHeight

  // 为每个食物项设置随机位置，确保不会超出容器边界
  const foodItems = document.querySelectorAll('.food-item')
  foodItems.forEach((item) => {
    // 获取元素宽高，确保不会超出边界
    const itemWidth = item.offsetWidth || 80
    const itemHeight = item.offsetHeight || 30
    
    // 计算安全的随机位置
    const left = Math.random() * (containerWidth - itemWidth - 20)
    const top = Math.random() * (containerHeight - itemHeight - 20)
    
    item.style.left = `${left}px`
    item.style.top = `${top}px`
  })
}

// 关闭结果弹窗
const closeResult = () => {
  showResult.value = false
  // 关闭弹窗后重新分散词云
  setTimeout(() => {
    distributeItems()
  }, 100)
}

// 获取食物项的样式
const getItemStyle = (item, index) => {
  // 基础样式
  const style = {
    fontSize: `${Math.random() * 1 + 0.8}em`,
    opacity: selectedIndex.value === -1 || selectedIndex.value === index ? 1 : 0.3,
    transform: `rotate(${Math.random() * 30 - 15}deg)`,
    transition: 'all 0.3s ease',
  }

  // 不再在这里设置位置，位置由 distributeItems 函数统一管理

  // 如果是选中的食物，放大显示
  if (selectedIndex.value === index && showResult.value) {
    style.fontSize = '2.5em'
    style.fontWeight = 'bold'
    style.color = '#409EFF'
    style.transform = 'rotate(0deg)'
  }

  return style
}

// 开始选择食物
const startSelection = () => {
  if (isSelecting.value) return

  isSelecting.value = true
  showResult.value = false

  // 重新洗牌食物列表
  const shuffled = [...foodData.foods].sort(() => 0.5 - Math.random())
  displayFoods.value = shuffled.slice(0, 20)

  // 先分散词云
  setTimeout(() => {
    distributeItems()

    // 然后开始动画
    let counter = 0
    const totalSteps = 20 // 动画总步数

    const animationInterval = setInterval(() => {
      selectedIndex.value = Math.floor(Math.random() * displayFoods.value.length)
      counter++

      // 在动画过程中随机移动词云项
      if (counter % 3 === 0) {
        // 每 3 步更新一次位置
        distributeItems()
      }

      // 动画结束
      if (counter >= totalSteps) {
        clearInterval(animationInterval)
        selectedFood.value = displayFoods.value[selectedIndex.value]
        showResult.value = true

        // 延迟重置状态
        setTimeout(() => {
          isSelecting.value = false
        }, 1500)
      }
    }, animationSpeed.value)
  }, 100)
}
</script>

<style scoped>
.eat-what-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px;
  background-color: #f5f7fa;
  overflow: hidden;
}

.title {
  font-size: 2rem;
  color: #303133;
  margin-bottom: 20px;
  text-align: center;
}

.word-cloud-container {
  position: relative;
  width: 80%;
  height: 60vh;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.food-item {
  position: absolute;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(64, 158, 255, 0.1);
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  /* 确保初始位置不会堆积在左上角 */
  left: 50%;
  top: 50%;
  transform-origin: center center;
}

.food-item:hover {
  background-color: rgba(64, 158, 255, 0.2);
}

.selected-food {
  z-index: 10;
}

.action-button {
  font-size: 1.1rem;
  padding: 10px 25px;
  margin-bottom: 10px;
}

.result-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.result-box {
  position: relative;
  background-color: white;
  padding: 30px 50px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: pop-in 0.5s ease;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #909399;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #409eff;
}

.result-text {
  font-size: 2.5rem;
  font-weight: bold;
  color: #409eff;
}

@keyframes pop-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

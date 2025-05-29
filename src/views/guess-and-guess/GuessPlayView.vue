<template>
  <div class="play-view">
    <el-card class="box-card">
      <el-form :inline="true" @submit.prevent>
        <el-form-item label="输入选手ID">
          <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearch"
            placeholder="请输入选手ID"
            @select="handleSelect"
            @keyup.enter.native="onConfirm"
            clearable
            style="width: 250px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onConfirm">确定</el-button>
          <el-button @click="onClear">清空</el-button>
          <el-button type="danger" @click="onGiveUp">投降</el-button>
          <el-button type="warning" @click="resetGame">重新开始</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table v-if="guessHistory.length" :data="guessHistory" style="width: 100%; margin-top: 24px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="id" label="选手ID" width="120" />
      <el-table-column prop="country" label="国家/地区">
        <template #default="scope">
          <span
            :class="{
              'highlight-green': answerPlayer && scope.row.country === answerPlayer.country,
              'highlight-yellow':
                answerPlayer &&
                scope.row.country !== answerPlayer.country &&
                countryContinent[scope.row.country] &&
                countryContinent[answerPlayer.country] &&
                countryContinent[scope.row.country] === countryContinent[answerPlayer.country],
            }"
          >
            {{ scope.row.country }}
            <span
              v-if="countryFlagMap[scope.row.country]"
              :class="'flag-icon flag-icon-' + countryFlagMap[scope.row.country]"
              style="margin-left: 4px"
            ></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="team" label="战队" width="120">
        <template #default="scope">
          <span
            :class="{
              'highlight-green':
                answerPlayer &&
                extractTeamName(scope.row.team) === extractTeamName(answerPlayer.team),
            }"
          >
            {{ scope.row.team }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="100">
        <template #default="scope">
          <span
            :class="{
              'highlight-green':
                answerPlayer && 2025 - scope.row.birth_year === 2025 - answerPlayer.birth_year,
              'highlight-yellow':
                answerPlayer &&
                Math.abs(2025 - scope.row.birth_year - (2025 - answerPlayer.birth_year)) >= 1 &&
                Math.abs(2025 - scope.row.birth_year - (2025 - answerPlayer.birth_year)) <= 3,
            }"
          >
            {{ 2025 - scope.row.birth_year }}
            <template v-if="answerPlayer">
              <span
                v-if="2025 - scope.row.birth_year < 2025 - answerPlayer.birth_year"
                >▲</span
              >
              <span
                v-else-if="2025 - scope.row.birth_year > 2025 - answerPlayer.birth_year"
                >▼</span
              >
            </template>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="位置" width="100">
        <template #default="scope">
          <span
            :class="{ 'highlight-green': answerPlayer && scope.row.role === answerPlayer.role }"
          >
            {{ scope.row.role }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="majapp" label="Major参赛次数" width="120">
        <template #default="scope">
          <span
            :class="{
              'highlight-green': answerPlayer && scope.row.majapp === answerPlayer.majapp,
              'highlight-yellow':
                answerPlayer &&
                Math.abs(scope.row.majapp - answerPlayer.majapp) >= 1 &&
                Math.abs(scope.row.majapp - answerPlayer.majapp) <= 2,
            }"
          >
            {{ scope.row.majapp }}
            <template v-if="answerPlayer">
              <span
                v-if="scope.row.majapp < answerPlayer.majapp"
                >▲</span
              >
              <span
                v-else-if="scope.row.majapp > answerPlayer.majapp"
                >▼</span
              >
            </template>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import playersData from '@/assets/players_data.json'
import countryContinent from '@/assets/country_continent.json'
import countryFlagMap from '@/assets/country_flag_map.json'

const input = ref('')
const selectedPlayer = ref(null)
const selectedPlayerId = ref('')
const guessHistory = ref([])
const answerId = ref('')
const answerPlayer = ref(null)
const guessCount = ref(0)
const maxGuess = 8

const playerIds = Object.keys(playersData)

function randomAnswer() {
  const idx = Math.floor(Math.random() * playerIds.length)
  answerId.value = playerIds[idx]
  answerPlayer.value = playersData[answerId.value]
}

onMounted(() => {
  resetGame()
})

function resetGame() {
  input.value = ''
  selectedPlayer.value = null
  selectedPlayerId.value = ''
  guessHistory.value = []
  guessCount.value = 0
  randomAnswer()
}

function querySearch(queryString, cb) {
  const results = playerIds
    .filter((id) => id.toLowerCase().includes(queryString.toLowerCase()))
    .map((id) => ({ value: id }))
  cb(results)
}

function handleSelect(item) {
  selectedPlayerId.value = item.value
  selectedPlayer.value = playersData[item.value]
}

function showPlayerInfoBox(title, message, player) {
  ElMessageBox.alert(
    `<div>${message}</div>
    <div style='margin-top:12px;'>
      国家/地区：${player.country} <span class="flag-icon flag-icon-${countryFlagMap[player.country] || 'un'}"></span><br/>
      战队：${player.team}<br/>
      年龄：${2025 - player.birth_year}<br/>
      位置：${player.role}<br/>
      Major参赛次数：${player.majapp}<br/>
      HLTV链接：<a href='${player.link}' target='_blank'>${player.link}</a>
    </div>`,
    title,
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '重新开始',
      callback: () => {
        // resetGame() // 关闭box后自动重开
      },
    },
  )
}

function onConfirm() {
  if (!input.value) {
    ElMessage.warning('请输入选手ID')
    return
  }
  if (!playersData[input.value]) {
    ElMessage.error('未找到该选手')
    return
  }
  // 记录猜测
  const guessId = input.value
  const player = playersData[guessId]
  guessHistory.value.push({
    id: guessId,
    ...player,
  })
  guessCount.value++
  // 判断胜负
  if (guessId === answerId.value) {
    showPlayerInfoBox(
      '胜利',
      '恭喜你猜对了！\n答案是：${answerId.value}`, answerPlayer.value',
      player,
    )
    return
  }
  if (guessCount.value >= maxGuess) {
    showPlayerInfoBox(
      '游戏结束',
      `很遗憾，已达最大次数。答案是：${answerId.value}`,
      answerPlayer.value,
    )
    return
  }
  selectedPlayerId.value = guessId
  selectedPlayer.value = player
  input.value = ''
}

function onGiveUp() {
  showPlayerInfoBox('游戏结束', `你已投降，答案是：${answerId.value}`, answerPlayer.value)
}

function extractTeamName(team) {
  if (!team) return ''
  const idx = team.indexOf('(')
  return idx === -1 ? team.trim() : team.slice(0, idx).trim()
}
</script>

<style scoped>
.play-view {
  max-width: 800px;
  margin: 40px auto;
}
.box-card {
  padding: 24px;
}
.highlight-green {
  background: #d4f7d4;
  color: #21b21b;
  font-weight: bold;
  border-radius: 4px;
  padding: 0 4px;
}
.highlight-yellow {
  background: #fff8d8;
  color: #e6a23c;
  font-weight: bold;
  border-radius: 4px;
  padding: 0 4px;
}
</style>

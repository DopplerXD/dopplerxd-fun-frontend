<template>
  <div class="background">
    <el-container>
      <!-- <el-header>
        <NavComponent />
      </el-header> -->
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import NavComponent from './components/NavComponent.vue';

onMounted(() => {
  document.title = 'DopplerXD\'s Fun'
})

// 解决ERROR ResizeObserver loop completed with undelivered notifications.
// 重写ResizeObserver的构造函数，并在其中定义并调用防抖函数
window.ResizeObserver = class ResizeObserver extends window.ResizeObserver {
    constructor(callback) {
        let timer = null;
        const debouncedCallback = function () {
            let context = this;
            let args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, 16);
        };
        super(debouncedCallback);
    }
};
</script>

<style scoped>
</style>

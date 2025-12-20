<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

// 启用 Spring 滚动动画
useSmoothScroll()
</script>

<template>
  <div id="app">
    <Header />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Footer />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app > main {
  flex: 1;
}
</style>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  tagline?: string
  features?: string
}>()
</script>

<template>
  <div class="end-container">
    <div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600">
      {{ title }}
    </div>

    <div v-if="subtitle" class="text-2xl text-slate-600 mt-4">
      {{ subtitle }}
    </div>

    <div v-if="tagline" class="mt-8 text-gray-500">
      {{ tagline }}
    </div>

    <div v-if="features" class="mt-6 text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-blue-400 to-green-400">
      {{ features }}
    </div>
  </div>
</template>

<style scoped>
.end-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>

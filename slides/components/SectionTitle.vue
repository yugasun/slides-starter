<script setup lang="ts">
defineProps<{
  number: string | number
  title: string
  subtitle?: string
  color?: string
}>()
</script>

<template>
  <div class="section-container">
    <h1>
      <span :class="`text-${color || 'blue'}-600`">{{ number }}、</span>{{ title }}
    </h1>
    <div v-if="subtitle" class="text-slate-600 mt-4">{{ subtitle }}</div>
  </div>
</template>

<style scoped>
.section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>

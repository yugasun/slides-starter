<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    email?: string;
  }>(),
  {
    title: 'Q&A',
    subtitle: 'Thanks for listening!',
    email: 'yugasun.ai@gmail.com',
  },
);
</script>

<template>
  <div class="qa-container">
    <h1 class="text-5xl text-slate-800">{{ title }}</h1>

    <div class="text-slate-600 text-xl mt-4">
      {{ subtitle }}
    </div>

    <div
      v-if="email"
      class="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm">
      📧 Contact: <span class="text-blue-600">{{ email }}</span>
    </div>
  </div>
</template>

<style scoped>
.qa-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>

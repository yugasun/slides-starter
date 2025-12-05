<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    version?: string;
    date?: string;
    stage?: string;
    githubUrl?: string;
    gradientFrom?: string;
    gradientTo?: string;
  }>(),
  {
    gradientFrom: 'blue-600',
    gradientTo: 'cyan-600',
    githubUrl: 'https://github.com/yugasun',
  },
);
</script>

<template>
  <div class="cover-container">
    <h1>
      {{ title.split(' ')[0] }}
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r"
        :class="`from-${gradientFrom || 'blue-600'} to-${
          gradientTo || 'cyan-600'
        }`">
        {{ title.split(' ').slice(1).join(' ') }}
      </span>
    </h1>

    <div v-if="subtitle" class="text-2xl text-slate-600 mt-2">
      {{ subtitle }}
    </div>

    <div v-if="version || date || stage" class="pt-8">
      <span
        class="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 text-blue-700 font-medium">
        <span v-if="version">v{{ version }}</span>
        <span v-if="version && date"> | </span>
        <span v-if="date">{{ date }}</span>
        <span v-if="(version || date) && stage"> | </span>
        <span v-if="stage">{{ stage }}</span>
      </span>
    </div>

    <div v-if="githubUrl" class="abs-br m-6 flex gap-2">
      <a
        :href="githubUrl"
        target="_blank"
        alt="GitHub"
        class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-blue-600">
        <carbon-logo-github />
      </a>
    </div>
  </div>
</template>

<style scoped>
.cover-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>

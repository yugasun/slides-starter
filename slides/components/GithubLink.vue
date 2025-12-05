<script setup lang="ts">
withDefaults(
  defineProps<{
    githubUrl?: string;
  }>(),
  {
    githubUrl: 'https://github.com/yugasun',
  },
);
</script>

<template>
  <div v-if="githubUrl" class="abs-br m-6 flex gap-2">
    <a 
      :href="githubUrl" 
      target="_blank" 
      alt="GitHub"
      class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-blue-600"
    >
      <carbon-logo-github />
    </a>
  </div>
</template>

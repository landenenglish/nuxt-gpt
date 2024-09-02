<script setup lang="ts">
const response = await useFetch('/api/chat', {
  method: 'POST',
  body: {
    prompt: 'What is the capital of the United States?',
  },
})
</script>

<template>
  <pre>{{ response }}</pre>
</template>

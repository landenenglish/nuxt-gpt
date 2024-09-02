<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '#app'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const prompt = ref('')

const { execute, data, status } = await useFetch('/api/chat', {
  method: 'POST',
  onRequest: ({ options }) => {
    options.body = { prompt: prompt.value }
  },
  immediate: false,
})

const handleSubmit = () => {
  if (!prompt.value || status.value === 'pending') return
  execute()
  prompt.value = ''
}

const responseMessage = computed(
  () => data.value?.choices?.[0]?.message?.content ?? ''
)
</script>

<template>
  <div class="flex h-[80vh] items-center justify-center p-4">
    <div class="w-full max-w-lg rounded-lg p-6 shadow-lg">
      <h1 class="mb-4 text-2xl font-semibold">Chat with AI</h1>

      <div class="mb-4">
        <InputText
          v-model="prompt"
          placeholder="Enter a prompt"
          class="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2"
          @keydown.enter="handleSubmit"
        />
      </div>

      <Button
        :disabled="!prompt"
        class="w-full rounded py-2 font-semibold"
        @click="handleSubmit"
      >
        Fetch
      </Button>

      <div v-if="responseMessage" class="mt-6">
        <div class="whitespace-pre-wrap rounded border p-4">
          {{ responseMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

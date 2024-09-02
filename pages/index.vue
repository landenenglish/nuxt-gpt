<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

const prompt = ref('')

interface ChatItem {
  message: string
  isUser: boolean
  writtenAt: string
}

type ChatHistory = ChatItem[]

const chatHistory = useLocalStorage<ChatHistory>('chat-history-dummy', [])

const pushToChatHistory = (message: string, isUser: boolean) => {
  if (!message) return

  chatHistory.value.push({
    message,
    isUser,
    writtenAt: new Date().toISOString(),
  })
}

const { execute, status } = await useFetch('/api/chat', {
  method: 'POST',
  onRequest: ({ options }) => {
    options.body = { prompt: prompt.value }
  },
  onResponse: ({ response }) => {
    pushToChatHistory(response?._data?.choices?.[0]?.message?.content, false)
  },
  onRequestError() {
    pushToChatHistory('Something went wrong', false)
  },
  immediate: false,
})

const handleSubmit = () => {
  if (!prompt.value || status.value === 'pending') return
  execute()
  pushToChatHistory(prompt.value, true)
  prompt.value = ''
}
</script>

<template>
  <div class="flex h-full flex-col justify-between p-4">
    <div
      class="flex flex-col space-y-4 overflow-auto"
      style="max-height: calc(100vh - 120px)"
    >
      <div
        v-for="(chat, index) in chatHistory"
        :key="index"
        :class="[
          'max-w-xs rounded-lg p-4',
          chat.isUser ? 'ml-auto text-right' : 'mr-auto text-left',
        ]"
      >
        <div>{{ chat.message }}</div>
        <div class="mt-1 text-xs text-gray-500">
          {{ formatDistanceToNow(chat.writtenAt, { addSuffix: true }) }}
        </div>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <InputText
        v-model="prompt"
        placeholder="Enter a prompt"
        class="flex-grow rounded border px-4 py-2 focus:outline-none focus:ring-2"
        @keydown.enter="handleSubmit"
      />
      <Button
        :disabled="!prompt"
        class="rounded py-2 font-semibold"
        icon="pi pi-send"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

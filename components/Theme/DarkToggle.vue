<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleDark = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const icon = computed(() => (isDark.value ? 'pi-moon' : 'pi-sun'))
</script>

<template>
  <ClientOnly>
    <button type="button" class="topbar-item" @click="toggleDark()">
      <i :class="['pi', icon]" />
    </button>
  </ClientOnly>
</template>

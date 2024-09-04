<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleDark = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const icon = computed(() => {
  if (colorMode.unknown) return 'pi pi-spin pi-spinner'
  return isDark.value ? 'pi pi-sun' : 'pi pi-moon'
})
</script>

<template>
  <button type="button" class="topbar-item" @click="toggleDark">
    <i :class="icon" />
  </button>
</template>

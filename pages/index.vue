<script setup lang="ts">
import TerminalService from 'primevue/terminalservice'

const checked = ref(true)
const selectedCity = ref(null)
const cities = [
  { name: 'New York', value: 'new-york' },
  { name: 'Los Angeles', value: 'los-angeles' },
  { name: 'Chicago', value: 'chicago' },
  { name: 'Houston', value: 'houston' },
]

const sliderValue = ref(75)

const commandHandler = (text: string) => {
  let response
  const argsIndex = text.indexOf(' ')
  const command = argsIndex !== -1 ? text.substring(0, argsIndex) : text

  switch (command) {
    case 'date':
      response = 'Today is ' + new Date().toDateString()
      break

    case 'greet':
      response = 'Hola ' + text.substring(argsIndex + 1)
      break

    case 'random':
      response = Math.floor(Math.random() * 100)
      break

    default:
      response = 'Unknown command: ' + command
  }

  TerminalService.emit('response', response)
}

onMounted(() => {
  TerminalService.on('command', commandHandler)
})

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler)
})

const inputModel = ref('')

const headingMessage = 'Nuxt + PrimeVue + TailwindCSS'
</script>

<template>
  <div class="Home gap-6 space-x-2">
    <!-- heading -->
    <h1 class="mb-10 ml-2 text-2xl font-bold">{{ headingMessage }}</h1>

    <Button class="mb-6 ml-2" :label="'This Is A Button'" />
    <Button class="mb-6" :label="'This Is A Button'" />
    <Divider />
    <Slider v-model="sliderValue" class="w-full" />
    <Divider />

    <Divider />
    <ClientOnly>
      <Terminal
        welcome-message="Enter a command (date, greet, random)"
        prompt="terminal $ "
        aria-label="PrimeVue Terminal Service"
      />
    </ClientOnly>
    <Divider />

    <Checkbox v-model="checked" :binary="true" /><Checkbox
      v-model="checked"
      :binary="true"
    /><Checkbox v-model="checked" :binary="true" />
    <Divider />

    <Dropdown
      v-model="selectedCity"
      :options="cities"
      option-label="name"
      placeholder="Select a City"
      checkmark
      :highlight-on-select="false"
    />
    <Divider />

    <FloatLabel class="my-6">
      <InputText id="username" v-model="inputModel" />
      <label for="username">Input</label>
    </FloatLabel>
    <Divider />
  </div>
</template>

<style lang="scss">
// .Home {
//
// }
</style>

<script setup lang="ts">
interface Theme {
  '--primary-50': string
  '--primary-100': string
  '--primary-200': string
  '--primary-300': string
  '--primary-400': string
  '--primary-500': string
  '--primary-600': string
  '--primary-700': string
  '--primary-800': string
  '--primary-900': string
  '--primary-950': string
}

// const themes: Theme[] = [
//   {
//     '--primary-50': '236 253 245',
//     '--primary-100': '209 250 229',
//     '--primary-200': '167 243 208',
//     '--primary-300': '110 231 183',
//     '--primary-400': '52 211 153',
//     '--primary-500': '16 185 129',
//     '--primary-600': '5 150 105',
//     '--primary-700': '4 120 87',
//     '--primary-800': '6 95 70',
//     '--primary-900': '4 78 56',
//     '--primary-950': '2 44 34',
//   },
//   // Blue
//   {
//     '--primary-50': '239 246 255',
//     '--primary-100': '219 234 254',
//     '--primary-200': '191 219 254',
//     '--primary-300': '147 197 253',
//     '--primary-400': '96 165 250',
//     '--primary-500': '59 130 246',
//     '--primary-600': '37 99 235',
//     '--primary-700': '29 78 216',
//     '--primary-800': '30 64 175',
//     '--primary-900': '30 58 138',
//     '--primary-950': '23 37 84',
//   },
// ] as const

const currentTheme = ref()

const changeTheme = (theme: Theme) => {
  currentTheme.value = theme
  localStorage.setItem('theme', JSON.stringify(theme))
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

onMounted(() => {
  const theme = localStorage.getItem('theme')
  if (theme) changeTheme(JSON.parse(theme))
})

// const getRGB = (color: string) => color.split(' ').join(', ')

// const getBadgeStyle = (theme: Theme) => ({
//   backgroundColor: `rgb(${getRGB(theme['--primary-500'])})`,
//   cursor: 'pointer',
// })

// const isThemeActive = (theme: Theme) => {
//   if (!currentTheme.value) return false
//   return JSON.stringify(currentTheme.value) === JSON.stringify(theme)
// }

// const items = ref([
//   {
//     label: 'Documents',
//     items: [
//       {
//         label: 'New',
//         icon: 'pi pi-plus',
//       },
//       {
//         label: 'Search',
//         icon: 'pi pi-search',
//       },
//     ],
//   },
//   {
//     label: 'Profile',
//     items: [
//       {
//         label: 'Settings',
//         icon: 'pi pi-cog',
//       },
//       {
//         label: 'Logout',
//         icon: 'pi pi-sign-out',
//       },
//     ],
//   },
// ])

const menuItems = ref([
  {
    label: 'Change Theme',
    items: [
      {
        label: 'Refresh',
        icon: 'pi pi-refresh',
      },
    ],
  },
])

const menu = ref()
const toggle = (event: unknown) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="TheThemePicker card flex justify-center">
    <Button
      type="button"
      icon="pi pi-ellipsis-v"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click="toggle"
    />
    <Menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true">
      <template #item="item">
        <pre>{{ item.item.label }}</pre>
      </template>
    </Menu>

    <!-- <button
      v-for="(theme, idx) in themes"
      :key="idx"
      value=""
      :style="getBadgeStyle(theme)"
      :class="[
        'w-4 h-4 rounded-full cursor-pointer ring-offset-surface-0 dark:ring-offset-surface-800 ring-primary-500',
        isThemeActive(theme) && 'ring-2 ring-offset-2',
      ]"
      @click="changeTheme(theme)"
    /> -->
  </div>
</template>

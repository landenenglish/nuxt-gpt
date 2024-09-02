<script setup lang="ts">
export interface NavItem {
  name: string
  path: string
  children?: NavItem[]
}

export interface TheNavBarItemProps {
  navItem: NavItem
}

defineProps<TheNavBarItemProps>()
</script>

<template>
  <li class="group relative">
    <nuxt-link
      :to="navItem.path"
      class="block rounded-md px-3 py-2 hover:bg-gray-700"
    >
      {{ navItem.name }}
    </nuxt-link>
    <ul
      v-if="navItem.children && navItem.children.length"
      class="absolute hidden space-y-2 rounded-md bg-gray-700 py-2 group-hover:block"
    >
      <TheNavBarItem
        v-for="child in navItem.children"
        :key="child.path"
        :nav-item="child"
      />
    </ul>
  </li>
</template>

<template>
  <v-app>
    <default-bar @showDrawer="showDrawer"/>

    <default-drawer :drawer="drawer"/>

    <default-view />
  </v-app>
</template>

<script setup>
  import { ref } from "vue"
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import DefaultDrawer from './AppDrawer.vue'

  const drawer = ref(true)

  const showDrawer = () => {
    drawer.value = !drawer.value
  }
</script>

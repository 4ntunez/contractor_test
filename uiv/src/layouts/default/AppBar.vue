<template>
  <v-app-bar app clipped-left color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="emit('showDrawer')"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Contractor Test</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["showDrawer"]);
</script>

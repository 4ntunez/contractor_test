<template>
  <v-navigation-drawer app color="light" v-model="props.drawer"></v-navigation-drawer>
</template>

<script setup>
  import { defineProps, ref } from "vue"

  const props = defineProps(["drawer"])
</script>

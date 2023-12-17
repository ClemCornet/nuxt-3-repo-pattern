<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()

const {
  data: people,
  pending,
  error,
} = await $api.people.getPeople({}, route.params.slug as string)
</script>

<template>
  <nuxt-link :to="{ name: 'index' }">Back</nuxt-link>
  <div>
    {{ people }}
  </div>
</template>

<style scoped></style>

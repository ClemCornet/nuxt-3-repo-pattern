<script setup lang="ts">
// const { $api } = useNuxtApp()
const { user } = useAuth()

// const { data: house, pending, error } = await $api.house.getHouseById(6995)
</script>

<template>
  <h1>Welcome !</h1>
  <pre>{{ user }}</pre>
</template>

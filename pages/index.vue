<script setup lang="ts">
const { $api } = useNuxtApp()
const { houseRepository } = repository()

const { data: house, pending, error } = await $api.house.getHouseById(6995)
</script>

<template>
  <h1>House list :</h1>
  <div v-if="pending">
    <span class="loader">Loader ...</span>
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <div v-else>
    <pre>{{ house }}</pre>
  </div>
</template>

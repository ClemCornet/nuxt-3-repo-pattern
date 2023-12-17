<script setup lang="ts">
const { $api } = useNuxtApp()

const [
  { data: house1, pending: pendingHouse1, error },
  { data: house2, pending: pendingHouse2 },
] = await Promise.all([
  $api.house.getHouseById(5072),
  $api.house.getHouseById(3803),
])

const isLoading = computed(() => pendingHouse1.value && pendingHouse2.value)
</script>

<template>
  <h1>House list :</h1>
  <div v-if="isLoading">
    <span class="loader">Loader ...</span>
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <div v-else>
    <pre>{{ house1 }}</pre>
    <pre>{{ house2 }}</pre>
  </div>
</template>

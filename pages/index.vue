<script setup lang="ts">
import HouseRepository from '@/repository/house/house'

const { $api } = useNuxtApp()
const houseRepository = new HouseRepository($api)

const {
  data: house,
  error,
  pending,
} = await useLazyAsyncData(
  'getHouseById',
  () => houseRepository.getHouseById(3708),
  {
    transform: (response) => {
      return response.data.attributes
    },
    watch: [houseRepository],
  },
)

const runtimeConfig = useRuntimeConfig()

if (import.meta.server) {
  console.log('api secret', runtimeConfig)
} else {
  console.log('CSR')
}
</script>

<template>
  <div>{{ $config.public.apiBase }}</div>
  <div>{{ $config.apiSecret }}</div>

  <!-- <h1>House list :</h1>
  <div v-if="pending">
    <span class="loader">Loader ...</span>
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <div v-else>
    <pre>{{ house }}</pre>
  </div> -->
</template>

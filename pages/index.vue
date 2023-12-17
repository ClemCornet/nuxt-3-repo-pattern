<script setup lang="ts">
const { $api } = useNuxtApp();

const {
    data: people,
    pending,
    error
  } = await $api.people.getAllPeople();
</script>

<template>
  <h1>Characters list :</h1>
  <div
    v-if="pending"
  >
    <span class="loader">Loader ...</span>
  </div>
  <div v-else-if="error">
    {{  error }}
  </div>
  <div
    v-else
    class="product-wrapper"
  >
  <div v-for="(item, i) in people" :key="i">
    <nuxt-link :to="{ name: 'people-slug', params: { slug: item.name } }">{{ item.name }}</nuxt-link>
  </div>
  </div>
</template>

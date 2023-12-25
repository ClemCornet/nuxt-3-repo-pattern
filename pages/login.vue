<script setup lang="ts"></script>

<template>
  <nuxt-link :to="{ name: 'index' }">Back</nuxt-link>
  <UContainer
    class="flex flex-grow flex-col justify-center max-w-xl min-h-[500px]"
  >
    <h1 class="text-2xl semi-bold mb-12">Login</h1>
    <auth-step1 />
  </UContainer>
</template>

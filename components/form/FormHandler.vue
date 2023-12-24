<script setup lang="ts">
const props = defineProps<{
  request: () => void
}>()
</script>

<template>
  <slot
    :data="data"
    :pending="pending"
    :error="error"
    :execute="props.request"
  ></slot>
</template>

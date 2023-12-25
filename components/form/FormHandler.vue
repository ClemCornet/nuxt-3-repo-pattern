<script setup lang="ts">
const props = defineProps<{
  mutation: () => unknown
}>()
</script>

<template>
  <slot
    :data="data"
    :pending="pending"
    :error="error"
    :execute="props.request"
  />

  <slot name="submit" @click="props.mutation" />
</template>

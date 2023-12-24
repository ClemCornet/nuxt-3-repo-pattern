<template>
  <UCard>
    <div class="flex justify-end">
      <UButton
        icon="i-heroicons-user"
        size="md"
        color="gray"
        variant="solid"
        :trailing="false"
      >
        <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
      </UButton>
    </div>
  </UCard>
  <UContainer>
    <slot />
  </UContainer>
</template>

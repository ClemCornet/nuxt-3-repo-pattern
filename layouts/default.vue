<template>
  <UCard>
    <div class="flex justify-end">
      <nuxt-link :to="{ name: 'login' }">
        <UButton
          icon="i-heroicons-user"
          size="md"
          color="gray"
          variant="solid"
          :trailing="false"
        >
          Login
        </UButton>
      </nuxt-link>
    </div>
  </UCard>
  <UContainer>
    <slot />
  </UContainer>
</template>

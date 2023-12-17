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
        Login
      </UButton>
    </div>
  </UCard>
  <UContainer>
    <slot />
  </UContainer>
</template>

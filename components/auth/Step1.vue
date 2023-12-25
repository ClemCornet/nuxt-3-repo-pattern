<script setup lang="ts">
import type { FormError } from '#ui/types'

const { $api } = useNuxtApp()

const state = reactive({
  email: '',
})
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  return errors
}

const { data, pending, error, execute, status } =
  await $api.auth.signinModule.signin()
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="execute"
  >
    <UFormGroup class="mb-8" label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
    <div class="flex justify-end">
      <UButton type="submit" :loading="status === 'pending'"> Submit </UButton>
    </div>
  </UForm>
  <pre>data: {{ data }}</pre>
  <pre v-if="error">errors: {{ error.cause[0].user }}</pre>
  <div>{{ pending }}</div>
</template>

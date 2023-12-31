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
const mutation = async () => {
  const { data, error, status } = await $api.auth.signinModule.signin({
    user: { email: state.email },
  })

  return {
    data,
    error,
    status,
  }
}
const onSubmit = () => ({
  onSuccess: (response: unknown) => {
    console.log('response cb', response)
  },
  onError: (err: unknown) => {
    console.log('err cb', err)
  },
})
</script>

<template>
  <FormHandler :mutation="mutation" :on-submit="onSubmit">
    <template #default="{ data, error, status }">
      <UFormGroup class="mb-8" label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton :loading="status === 'pending'" type="submit">
          Submit
        </UButton>
      </div>
      <pre>{{ data }}</pre>
      <pre>{{ error }}</pre>
      <pre>{{ status }}</pre>
    </template>
  </FormHandler>
</template>

<script setup lang="ts">
import type { FormError } from '#ui/types'

const { $api } = useNuxtApp()
const cookieSession = useAuth()

// const emits = defineEmits<{
//   (e: 'onSuccess', step: 'login'): void
// }>()

// form logic
const state = reactive({
  token: '',
})
const validate = (state: Record<string, unknown>): FormError[] => {
  const errors = []
  if (!state.token) errors.push({ path: 'token', message: 'Required' })
  return errors
}
const mutation = async () => {
  const { data, error, status } = await $api.auth.signinModule.signinWithToken({
    email: 'cornet.clement@gmail.com',
    login_token: state.token,
  })

  return {
    data,
    error,
    status,
  }
}
const onSubmit = () => ({
  onSuccess: (response: Ref<unknown>) => {
    return response.value
  },
  onError: (err: Ref<Error | null>) => {
    console.log('err cb', err)
  },
})
</script>

<template>
  <FormHandler
    :mutation="mutation"
    :on-submit="onSubmit"
    :state="state"
    :validate="validate"
  >
    <template #default="{ status }">
      <UFormGroup class="mb-8" label="Entrez votre code" name="token">
        <UInput v-model="state.token" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton :loading="status === 'pending'" type="submit">
          Submit
        </UButton>
      </div>
    </template>
  </FormHandler>
  <pre>{{ cookieSession }}</pre>
</template>

<script setup lang="ts">
import type { FormError } from '#ui/types'
import AuthRepository from '@/repository/auth/auth'

const { $api } = useNuxtApp()
const authRepository = new AuthRepository($api)

defineOptions({
  inheritAttrs: false,
})
const emits = defineEmits<{
  (e: 'onSuccess', payload: Record<string, string>): void
}>()

const localState = reactive({
  email: '',
})
const validate = (localState: Record<string, unknown>): FormError[] => {
  const errors = []
  if (!localState.email) errors.push({ path: 'email', message: 'Required' })
  return errors
}

const mutation = async () => {
  const { data, error, status, pending } = await useLazyAsyncData(
    'signin',
    // () => authRepository.signin({ email: localState.email }),
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true })
        }, 2000)
      }),
  )

  return { data, error, status, pending }
}

const onSubmit = () => ({
  onSuccess: (response: Ref<{ success: true } | null>) => {
    if (response.value?.success) {
      emits('onSuccess', { step: 'step2', value: localState.email })
    }
  },
  onError: (err: Ref<Error | null>) => {
    console.log('err cb', err)
  },
})
</script>

<template>
  <!-- @vue-ignore -->
  <FormHandler
    :mutation="mutation"
    :on-submit="onSubmit"
    :state="localState"
    :validate="validate"
  >
    <template #default="{ pending, status }">
      <UFormGroup class="mb-8" label="Email" name="email">
        <UInput v-model="localState.email" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton :loading="status === 'pending'" type="submit">
          Submit
        </UButton>
      </div>
    </template>
  </FormHandler>
</template>

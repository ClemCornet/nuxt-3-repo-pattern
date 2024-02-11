<script setup lang="ts">
import type { FormError } from '#ui/types'

const { $api } = useNuxtApp()

const emits = defineEmits<{
  (e: 'onSuccess', payload: Record<string, string>): void
}>()

// form logic
const state = reactive({
  email: '',
})
const validate = (state: Record<string, unknown>): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  return errors
}
const mutation = async () => {
  const { data, error, status, pending } = await $api.auth.signinModule.signin({
    user: { email: state.email as string },
  })

  return {
    data,
    error,
    status,
    pending,
  }
}
const onSubmit = () => ({
  onSuccess: (response: Ref<{ success: true } | null>) => {
    if (response.value?.success) {
      emits('onSuccess', { step: 'step2', value: state.email })
    }
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
    <template #default="{ pending }">
      <UFormGroup class="mb-8" label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton :loading="pending" type="submit"> Submit </UButton>
      </div>
    </template>
  </FormHandler>
  <div></div>
</template>

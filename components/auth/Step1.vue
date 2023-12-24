<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { $api } = useNuxtApp()

const isLoading = ref(false)
const state = reactive({
  email: '',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  return errors
}

function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  const { data, pending, error } = $api.auth.signinModule.signin()

  return {
    data,
    pending,
    error,
  }
}
</script>

<template>
  <FormHandler v-slot="{ data, pending, error, execute }" :request="onSubmit">
    <UForm :validate="validate" :state="state" class="space-y-4">
      <UFormGroup class="mb-8" label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton :loading="pending" @click="execute"> Submit </UButton>
      </div>
    </UForm>
    <div v-if="data">{{ data }}</div>
    <div v-if="error">{{ error }}</div>
  </FormHandler>
</template>

<script setup lang="ts">
import type { FormError } from '#ui/types'

const { $api } = useNuxtApp()

const state = reactive({
  email: '',
})
let request = reactive({
  data: '',
  error: '',
  status: '',
})
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  return errors
}

const onSubmit = async (email: string) => {
  const { data, error, status } = await $api.auth.signinModule.signin({
    user: { email },
  })
  request = { ...toRefs({ data, error, status }) }
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4">
    <UFormGroup class="mb-8" label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
    <div class="flex justify-end">
      <UButton
        :loading="request.status === 'pending'"
        @click="onSubmit(state.email)"
      >
        Submit
      </UButton>
      <pre>{{ request.status }}</pre>
    </div>
  </UForm>
</template>

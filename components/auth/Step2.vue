<script setup lang="ts">
import type { FormError } from '#ui/types'

const { $api } = useNuxtApp()
const router = useRouter()
const { setUser } = useAuth()
const props = defineProps<{
  state: Record<string, unknown>
}>()

// form logic
const localState = reactive({
  token: '',
})
const validate = (state: Record<string, unknown>): FormError[] => {
  const errors = []
  if (!state.token) errors.push({ path: 'token', message: 'Required' })
  return errors
}
const mutation = async () => {
  const { data, error, pending, status } =
    await $api.auth.signinModule.signinWithToken({
      email: props.state.email as string,
      login_token: localState.token,
    })

  return {
    data,
    error,
    pending,
    status,
  }
}
const onSubmit = () => ({
  onSuccess: (response) => {
    if (response.value) {
      setUser({
        email: response.value.email,
        firstname: response.value.firstName,
        lastname: response.value.lastName,
        isAdmin: response.value.isAdmin,
      })
      router.push({ name: 'account' })
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
    :state="localState"
    :validate="validate"
  >
    <template #default="{ pending }">
      <UFormGroup class="mb-8" label="Enter your code" name="token">
        <UInput v-model="localState.token" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton :loading="pending" type="submit"> Submit </UButton>
      </div>
    </template>
  </FormHandler>
</template>

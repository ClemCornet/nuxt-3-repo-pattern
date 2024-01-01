<script setup lang="ts" generic="DataT">
import { defineProps, reactive } from 'vue'
import type { AsyncDataRequestStatus } from 'nuxt/dist/app/composables/asyncData'
import type { FormError } from '#ui/types'

interface ResponseRef<T> {
  data: Ref<T>
  error: Ref<Error | null>
  status: Ref<AsyncDataRequestStatus | ''>
}

interface Response<T> {
  data: T
  error: Error | null
  status: AsyncDataRequestStatus | ''
}

const props = defineProps<{
  mutation: () => Promise<ResponseRef<DataT>>
  onSubmit: () => {
    onSuccess: (response: Ref<DataT>) => void
    onError: (err: Ref<Error | null>) => void
  }
  validate: (state: any) => FormError[]
  state: Record<string, unknown>
}>()

const request = reactive({
  data: null,
  error: null,
  status: '',
}) as Response<DataT>

const onSubmit = () => {
  props.mutation().then(({ data, error, status }) => {
    request.data = data as unknown as DataT
    request.error = error as unknown as Error | null
    request.status = status as unknown as AsyncDataRequestStatus

    const { onSuccess, onError } = props.onSubmit()
    onSuccess(data)
    onError(error)
  })
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <slot
      :data="request.data"
      :error="request.error"
      :status="request.status"
    />
  </UForm>
</template>

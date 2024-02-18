<script setup lang="ts" generic="DataT">
import { defineProps, reactive } from 'vue'
import type { FormError } from '#ui/types'

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
interface ResponseRef<T> {
  data: Ref<T>
  error: Ref<Error | null>
  status?: Ref<AsyncDataRequestStatus | ''>
  pending?: Ref<boolean>
}

interface Response<T> {
  data: T
  error: Error | null
  status?: AsyncDataRequestStatus | ''
  pending?: boolean
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
  pending: false,
  status: '',
}) as Response<DataT>

const onSubmit = () => {
  props.mutation().then(({ data, error, status, pending }) => {
    request.pending = pending as unknown as boolean
    request.status = status as unknown as AsyncDataRequestStatus
    request.data = data as unknown as DataT
    request.error = error as unknown as Error | null

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
      :pending="request.pending"
    />
  </UForm>
</template>

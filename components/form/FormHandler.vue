<script setup lang="ts" generic="DataT">
import type { AsyncDataRequestStatus } from 'nuxt/dist/app/composables/asyncData'

interface ResponseT<T> {
  data: T | null
  error: Error | null
  status: AsyncDataRequestStatus | ''
}

const props = defineProps<{
  mutation: () => Promise<ResponseT<DataT>>
  onSubmit: () => {
    onSuccess: (response: unknown) => void
    onError: (err: unknown) => void
  }
}>()

const request = reactive<{
  data: DataT | null
  error: Error | null
  status: AsyncDataRequestStatus | ''
}>({
  data: null,
  error: null,
  status: '',
}) as ResponseT<DataT>

const onSubmit = () => {
  props.mutation().then(({ data, error, status }) => {
    request.data = data
    request.error = error
    request.status = status

    const { onSuccess, onError } = props.onSubmit()
    onSuccess(data)
    onError(error)
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot
      :data="request.data"
      :error="request.error"
      :status="request.status"
    />
  </form>
</template>

<script setup lang="ts">
import { AuthStep1, AuthStep2, AuthStep3 } from '@/components/auth'

type Steps = 'step1' | 'step2' | 'step3'

const currentStep = ref('step1')
const componentsStep = reactive({
  step1: shallowRef(AuthStep1),
  step2: shallowRef(AuthStep2),
  step3: shallowRef(AuthStep3),
})

const state = reactive({
  email: '',
  token: '',
})

const handleSuccess = (payload: { step: string; value: string }) => {
  currentStep.value = payload.step
  state.email = payload.value
}
</script>

<template>
  <nuxt-link :to="{ name: 'index' }">Back</nuxt-link>
  <UContainer
    class="flex flex-grow flex-col justify-center max-w-xl min-h-[500px]"
  >
    <h1 class="text-2xl semi-bold mb-12">Login</h1>
    <!-- @vue-ignore -->
    <component
      :is="componentsStep[currentStep as Steps]"
      :state="state"
      @on-success="($event) => handleSuccess($event)"
    />
  </UContainer>
</template>

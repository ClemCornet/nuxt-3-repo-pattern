<script setup lang="ts">
import { AuthStep1, AuthStep2, AuthStep3 } from '@/components/auth'

type Steps = 'step1' | 'step2' | 'step3'

const currentStep = ref('step1')
const componentsStep = reactive({
  step1: shallowRef(AuthStep1),
  step2: shallowRef(AuthStep2),
  step3: shallowRef(AuthStep3),
})

const onSuccess = (step: Steps) => {
  console.log('success', step)
  currentStep.value = step
}
</script>

<template>
  <nuxt-link :to="{ name: 'index' }">Back</nuxt-link>
  <UContainer
    class="flex flex-grow flex-col justify-center max-w-xl min-h-[500px]"
  >
    <h1 class="text-2xl semi-bold mb-12">Login</h1>
    <component
      :is="componentsStep[currentStep as Steps]"
      @on-success="($event) => onSuccess($event as Steps)"
    />
  </UContainer>
</template>

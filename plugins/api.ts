import type { NuxtApp } from 'nuxt/app'
import { $fetch, type FetchOptions } from 'ofetch'

import HouseModule from '~/repository/modules/house/house'
import SigninModule from '~/repository/modules/auth/signin'
import SignupModule from '~/repository/modules/auth/signup'

interface ApiInstance {
  house: HouseModule
  auth: {
    signinModule: SigninModule
    signupModule: SignupModule
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl as string,
    headers: {
      'Accept-Language': 'en-US',
    },
  }

  const apiFecther = $fetch.create(fetchOptions)

  const modules: ApiInstance = {
    house: new HouseModule(nuxtApp as NuxtApp, apiFecther),
    auth: {
      signinModule: new SigninModule(apiFecther),
      signupModule: new SignupModule(apiFecther),
    },
  }

  return {
    provide: {
      api: modules,
    },
  }
})

import type { NuxtApp } from 'nuxt/app'
import { $fetch, type FetchOptions } from 'ofetch'

import FetchFactory from '~/repository/factory'
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
  const { cookies, setCookies } = useSessionCookies()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Accept-Language': 'en-US',
    },
  }

  const apiFecther = $fetch.create(fetchOptions)
  const factory = new FetchFactory(apiFecther, {
    getItem: (key: keyof typeof cookies) => {
      return cookies[key].value
    },
    setItem: (key: keyof typeof cookies, value: string) => {
      setCookies(key, value)
    },
  })

  const modules: ApiInstance = {
    house: new HouseModule(factory, nuxtApp as NuxtApp),
    auth: {
      signinModule: new SigninModule(factory),
      signupModule: new SignupModule(factory),
    },
  }

  return {
    provide: {
      api: modules,
    },
  }
})

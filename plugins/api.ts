import type { NuxtApp } from 'nuxt/app'
import { $fetch, type FetchOptions } from 'ofetch'

import PeopleModule from '~/repository/modules/people/people'
import HouseModule from '~/repository/modules/house/house'
import SigninModule from '~/repository/modules/auth/signin'
import SignupModule from '~/repository/modules/auth/signup'

interface ApiInstance {
  people: PeopleModule
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
  }

  const apiFecther = $fetch.create(fetchOptions)

  const modules: ApiInstance = {
    people: new PeopleModule(nuxtApp as NuxtApp, apiFecther),
    house: new HouseModule(nuxtApp as NuxtApp, apiFecther),
    auth: {
      signinModule: new SigninModule(nuxtApp as NuxtApp, apiFecther),
      signupModule: new SignupModule(nuxtApp as NuxtApp, apiFecther),
    },
  }

  return {
    provide: {
      api: modules,
    },
  }
})

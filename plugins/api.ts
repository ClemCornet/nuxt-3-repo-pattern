import { $fetch, type FetchOptions } from 'ofetch'

import FetchFactory from '~/repository/factory'

export default defineNuxtPlugin({
  setup() {
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

    return {
      provide: {
        api: factory,
      },
    }
  },
})

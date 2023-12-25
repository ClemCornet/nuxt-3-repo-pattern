import type { $Fetch, FetchOptions } from 'ofetch'
import type { NuxtApp } from '#app'

import FetchFactory from '../../factory'
import type { ApiResponse } from '~/repository/types'

class SigninModule extends FetchFactory<ApiResponse<unknown>> {
  constructor(
    private nuxtApp: NuxtApp,
    private _fetch: $Fetch,
  ) {
    super(_fetch)
  }

  private RESOURCES = {
    signin: 'v3/user/auth/sign_in',
    signinWithToken: 'v3/user/auth/sign_in_with_token',
  }

  signin() {
    return useLazyAsyncData(
      'signin',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          headers: {
            'Accept-Language': 'en-US',
          },
        }

        return this.call(
          'POST',
          this.RESOURCES.signin,
          {
            user: {
              email: 'cornet.clement@gmail.com',
            },
          },
          fetchOptions,
        )
      },
      {
        transform: (response: ApiResponse<unknown>) => {
          console.log('response signin', response)
          return response
        },
        immediate: false,
        server: false,
      },
    )
  }

  signinWithToken() {
    return useLazyAsyncData(
      'signin_with_token',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          headers: {
            'Accept-Language': 'en-US',
          },
        }

        return this.call(
          'POST',
          this.RESOURCES.signinWithToken,
          undefined,
          fetchOptions,
        )
      },
      {
        transform: (response: ApiResponse<unknown>) => {
          console.log('response signin', response)
          return response
        },
      },
    )
  }
}

export default SigninModule

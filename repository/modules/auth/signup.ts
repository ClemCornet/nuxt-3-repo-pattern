import type { $Fetch, FetchOptions } from 'ofetch'
import type { NuxtApp } from '#app'

import FetchFactory from '../../factory'
import type { ApiResponse } from '~/repository/types'

class SignupModule extends FetchFactory<ApiResponse<unknown>> {
  constructor(
    private nuxtApp: NuxtApp,
    private _fetch: $Fetch,
  ) {
    super(_fetch)
  }

  private RESOURCES = {
    auth: 'v3/user/auth',
    signupWithToken: 'v3/user/auth/sign_up_with_token',
    finishSignup: 'v3/user/auth/finish_signup',
  }

  auth() {
    return useLazyAsyncData(
      'auth',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          headers: {
            'Accept-Language': 'en-US',
          },
        }

        return this.call('POST', this.RESOURCES.auth, undefined, fetchOptions)
      },
      {
        transform: (response: ApiResponse<unknown>) => {
          return response
        },
      },
    )
  }

  signupWithToken() {
    return useLazyAsyncData(
      'signup_with_token',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          headers: {
            'Accept-Language': 'en-US',
          },
        }

        return this.call(
          'POST',
          this.RESOURCES.signupWithToken,
          undefined,
          fetchOptions,
        )
      },
      {
        transform: (response: ApiResponse<unknown>) => {
          return response
        },
      },
    )
  }

  finishSignup() {
    return useLazyAsyncData(
      'finish_sign_up',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          headers: {
            'Accept-Language': 'en-US',
          },
        }

        return this.call(
          'POST',
          this.RESOURCES.signupWithToken,
          undefined,
          fetchOptions,
        )
      },
      {
        transform: (response: ApiResponse<unknown>) => {
          return response
        },
      },
    )
  }
}

export default SignupModule

import type { $Fetch } from 'ofetch'

import FetchFactory from '../../factory'
import type { ApiResponse } from '~/repository/types'

class SignupModule {
  constructor(private $fetch: FetchFactory) {}

  auth() {
    return useLazyAsyncData(
      'auth',
      () => {
        return this.$fetch.call('POST', 'v3/user/auth', undefined)
      },
      {
        immediate: false,
        server: false,
      },
    )
  }

  signupWithToken() {
    return useLazyAsyncData(
      'signup_with_token',
      () => {
        return this.$fetch.call(
          'POST',
          'v3/user/auth/sign_up_with_token',
          undefined,
        )
      },
      {
        immediate: false,
        server: false,
      },
    )
  }

  finishSignup() {
    return useLazyAsyncData(
      'finish_sign_up',
      () => {
        return this.$fetch.call(
          'POST',
          'v3/user/auth/sign_up_with_token',
          undefined,
        )
      },
      {
        immediate: false,
        server: false,
      },
    )
  }
}

export default SignupModule

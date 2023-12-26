import type { $Fetch } from 'ofetch'

import FetchFactory from '../../factory'
import type { ApiResponse } from '~/repository/types'

class SignupModule extends FetchFactory<ApiResponse<unknown>> {
  constructor(private _fetch: $Fetch) {
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
        return this.call('POST', this.RESOURCES.auth, undefined)
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
        return this.call('POST', this.RESOURCES.signupWithToken, undefined)
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
        return this.call('POST', this.RESOURCES.signupWithToken, undefined)
      },
      {
        immediate: false,
        server: false,
      },
    )
  }
}

export default SignupModule

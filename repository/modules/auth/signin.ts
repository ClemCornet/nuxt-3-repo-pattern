import type { $Fetch } from 'ofetch'

import FetchFactory from '../../factory'
import type { ApiResponse } from '~/repository/types'

class SigninModule extends FetchFactory<ApiResponse<unknown>> {
  constructor(private _fetch: $Fetch) {
    super(_fetch)
  }

  private RESOURCES = {
    signin: 'v3/user/auth/sign_in',
    signinWithToken: 'v3/user/auth/sign_in_with_token',
  }

  signin(params: { user: { email: string } }) {
    console.log('params', params)
    return useLazyAsyncData(
      'signin',
      () => {
        return this.call('POST', this.RESOURCES.signin, { ...params })
      },
      {
        immediate: true,
        server: false,
      },
    )
  }

  signinWithToken() {
    return useLazyAsyncData(
      'signin_with_token',
      () => {
        return this.call('POST', this.RESOURCES.signinWithToken, undefined)
      },
      {
        immediate: false,
        server: false,
      },
    )
  }
}

export default SigninModule

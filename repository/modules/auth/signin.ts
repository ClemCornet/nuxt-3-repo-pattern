import type { $Fetch } from 'ofetch'

import FetchFactory from '../../factory'
// import type { ApiResponse } from '~/repository/types'

class SigninModule extends FetchFactory {
  constructor(private _fetch: $Fetch) {
    super(_fetch)
  }

  signin(params: { user: { email: string } }) {
    return useLazyAsyncData(
      'signin',
      () => {
        return this.call<{ success: true }>('POST', 'v3/user/auth/sign_in', {
          ...params,
        })
      },
      {
        immediate: true,
        server: false,
      },
    )
  }

  signinWithToken(params: { email: string; login_token: string }) {
    return useLazyAsyncData(
      'signin_with_token',
      () => {
        return this.call('POST', 'v3/user/auth/sign_in_with_token', {
          user: { ...params },
        })
      },
      {
        immediate: true,
        server: false,
      },
    )
  }
}

export default SigninModule

import FetchFactory from '../factory'
import type { User } from './interfaces/User'
import type { ApiResponse } from '~/repository/types'

class AuthRepository {
  constructor(private $fetch: FetchFactory) {}

  signin(params: { email: string }) {
    return this.$fetch.call<{ success: true }>('POST', 'v3/user/auth/sign_in', {
      user: { ...params },
    })
  }

  signinWithToken(params: { email: string; login_token: string }) {
    return this.$fetch.call<ApiResponse<User>>(
      'POST',
      'v3/user/auth/sign_in_with_token',
      {
        user: { ...params },
      },
    )
  }
}

export default AuthRepository

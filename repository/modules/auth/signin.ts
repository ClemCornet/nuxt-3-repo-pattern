import FetchFactory from '../../factory'
class SigninModule {
  constructor(private $fetch: FetchFactory) {}

  signin(params: { user: { email: string } }) {
    return useLazyAsyncData(
      'signin',
      () => {
        return this.$fetch.call<{ success: true }>(
          'POST',
          'v3/user/auth/sign_in',
          {
            ...params,
          },
        )
      },
      {
        immediate: true,
        server: true,
      },
    )
  }

  signinWithToken(params: { email: string; login_token: string }) {
    return useLazyAsyncData(
      'signin_with_token',
      () => {
        return this.$fetch.call('POST', 'v3/user/auth/sign_in_with_token', {
          user: { ...params },
        })
      },
      {
        immediate: true,
        server: true,
      },
    )
  }
}

export default SigninModule

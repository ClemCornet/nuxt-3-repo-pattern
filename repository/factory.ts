import type { $Fetch, FetchOptions } from 'ofetch'

type CookiesProvider = {
  getItem: (key: 'access-token' | 'client' | 'uid') => string | null | undefined
  setItem: (key: 'access-token' | 'client' | 'uid', value: string) => void
}

class FetchFactory {
  constructor(
    private $fetch: $Fetch,
    private cookiesProvider: CookiesProvider,
  ) {}

  async call<T>(
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<'json'>,
  ): Promise<T> {
    return await this.$fetch<T>(url, {
      method,
      body: data,
      onResponse: ({ response }) => {
        this.cookiesProvider.setItem(
          'access-token',
          response.headers.get('access-token') || '',
        )
        this.cookiesProvider.setItem(
          'client',
          response.headers.get('client') || '',
        )
        this.cookiesProvider.setItem('uid', response.headers.get('uid') || '')
      },
      onResponseError({ response }) {
        throw new Error(`Failed to fetch ${url}`, {
          cause: response._data.errors,
        })
      },
      ...fetchOptions,
      headers: {
        ...fetchOptions?.headers,
        'access-token': this.cookiesProvider.getItem('access-token') || '',
        client: this.cookiesProvider.getItem('client') || '',
        uid: this.cookiesProvider.getItem('uid') || '',
      },
    })
  }
}

export default FetchFactory

import type { $Fetch, FetchOptions } from 'ofetch'

class FetchFactory<T> {
  constructor(private $fetch: $Fetch) {}

  async call(
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<'json'>,
  ): Promise<T> {
    return await this.$fetch<T>(url, {
      method,
      body: data,
      onResponse: ({ response }) => {
        console.log('response', response.headers)
      },
      ...fetchOptions,
    })
  }
}

export default FetchFactory

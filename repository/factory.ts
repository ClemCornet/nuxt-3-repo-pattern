import type { $Fetch, FetchOptions } from 'ofetch'

class FetchFactory {
  constructor(private $fetch: $Fetch) {}

  async call<T>(
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<'json'>,
  ): Promise<T> {
    return await this.$fetch<T>(url, {
      method,
      body: data,
      onResponseError({ response }) {
        throw new Error(`Failed to fetch ${url}`, {
          cause: response._data.errors,
        })
      },
      ...fetchOptions,
    })
  }
}

export default FetchFactory

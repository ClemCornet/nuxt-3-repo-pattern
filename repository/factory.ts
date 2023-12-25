import type { $Fetch, FetchOptions, FetchResponse } from 'ofetch'

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
      onResponseError({ response }) {
        throw new Error('Connecting to database failed.', {
          cause: response._data.errors,
        })
      },
      ...fetchOptions,
    })
  }
}

export default FetchFactory

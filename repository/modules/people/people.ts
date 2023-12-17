import type { $Fetch, FetchOptions } from 'ofetch'
import type { AsyncDataOptions, NuxtApp } from '#app'

import FetchFactory from '../../factory'
import type { People } from '../people/interfaces/People'
import type { ApiResponse } from '~/repository/types'

class PeopleModule extends FetchFactory<ApiResponse<People>> {
  constructor(
    private nuxtApp: NuxtApp,
    private _fetch: $Fetch,
  ) {
    super(_fetch)
  }

  private RESOURCE = 'people'

  getAllPeople(asyncDataOptions?: AsyncDataOptions<People[]>) {
    return useLazyAsyncData(
      'getAllPeople',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          headers: {
            'Accept-Language': 'en-US',
          },
        }
        return this.call(
          'GET',
          `${this.RESOURCE}`,
          undefined, // body
          fetchOptions,
        )
      },
      {
        ...asyncDataOptions,
        // getCachedData: (key) => {
        //   return this.nuxtApp.payload.data[key] || this.nuxtApp.static.data[key]
        // },
        transform: (response: ApiResponse<People>) => {
          return response.results
        },
      },
    )
  }

  getPeople(asyncDataOptions?: AsyncDataOptions<People[]>, slug?: string) {
    return useAsyncData(
      'getPeople',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          headers: {
            'Accept-Language': 'en-US',
          },
        }
        return this.call(
          'GET',
          `${this.RESOURCE}/2`,
          undefined, // body
          fetchOptions,
        )
      },
      {
        ...asyncDataOptions,
        transform: (response: ApiResponse<People>) => {
          console.log('response', response)
          return response
        },
      },
    )
  }
}

export default PeopleModule

import type { $Fetch, FetchOptions } from 'ofetch'
import type { AsyncDataOptions, NuxtApp } from '#app'

import FetchFactory from '../../factory'
import type { House } from '../house/interfaces/House'
import type { ApiResponse } from '~/repository/types'

class HouseModule extends FetchFactory<ApiResponse<House>> {
  constructor(
    private nuxtApp: NuxtApp,
    private _fetch: $Fetch,
  ) {
    super(_fetch)
  }

  private RESOURCE = 'v3/houses/'

  getHouseById(houseId: number) {
    return useLazyAsyncData(
      'getHouseById',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          headers: {
            'Accept-Language': 'en-US',
          },
          params: {
            // 'fields[house]':
            //   'name,bathrooms,bedrooms,description,iconicCollection',
            include: 'destination',
          },
        }

        return this.call(
          'GET',
          `${this.RESOURCE}${houseId}`,
          undefined, // body
          fetchOptions,
        )
      },
      {
        // getCachedData: (key) => {
        //   return this.nuxtApp.payload.data[key] || this.nuxtApp.static.data[key]
        // },
        transform: (response: ApiResponse<House>) => {
          return response.data.attributes
        },
      },
    )
  }
}

export default HouseModule

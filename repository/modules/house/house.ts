import type { FetchOptions } from 'ofetch'
import type { NuxtApp } from '#app'

import FetchFactory from '../../factory'
import type { House } from '../house/interfaces/House'
import type { ApiResponse } from '~/repository/types'

class HouseModule {
  constructor(
    private $fetch: FetchFactory,
    private nuxtApp: NuxtApp,
  ) {}

  getHouseById(houseId: number) {
    return useLazyAsyncData(
      'getHouseById',
      () => {
        const fetchOptions: FetchOptions<'json'> = {
          params: {
            'fields[house]':
              'name,bathrooms,bedrooms,description,iconicCollection',
            include: 'destination',
          },
        }

        return this.$fetch.call<ApiResponse<House>>(
          'GET',
          `v3/houses/${houseId}`,
          undefined,
          fetchOptions,
        )
      },
      {
        // getCachedData: (key) => {
        //   return (
        //     (this.nuxtApp.payload.data[key] as unknown as ApiResponse<House>) ||
        //     (this.nuxtApp.static.data[key] as unknown as ApiResponse<House>)
        //   )
        // },
        transform: (response) => {
          return response.data.attributes
        },
      },
    )
  }
}

export default HouseModule

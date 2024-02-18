import type FetchFactory from '../factory'
import type { House } from './interfaces/House'
import type { ApiResponse } from '~/repository/types'

class HouseRepository {
  constructor(private $api: FetchFactory) {}

  getHouseById(houseId: number) {
    return this.$api.call<ApiResponse<House>>(
      'GET',
      `v3/houses/${houseId}`,
      undefined,
      {
        params: {
          'fields[house]':
            'name,bathrooms,bedrooms,description,iconicCollection',
          include: 'destination',
        },
      },
    )
  }
}

export default HouseRepository

export interface ApiResponse<Type> {
  data: {
    id: string
    type: string
    attributes: Type
    relationships: unknown
    included: unknown
  }
}

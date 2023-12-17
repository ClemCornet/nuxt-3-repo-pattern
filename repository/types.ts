export interface ApiResponse<Type> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[]
}[]

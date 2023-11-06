export interface ApiBaseResponseSchema<T> {
  status: string;
  data: T;
}

import { BrightBaseCRUD, BrightQuery } from 'brightside-developer'

export default function useCreateQuery<T extends { [key: string]: unknown }>(
  table: BrightBaseCRUD<T>,
  params: Parameters<typeof table.read>,
  queryOptions?: Omit<BrightQuery.QueryOptions<T[]>, 'queryKey' | 'queryFn'>
) {
  return {
    ...queryOptions,
    queryKey: [table.name, ...params],
    queryFn: () => table.read(...params),
  }
}

export type UseBrightSuspenseQueryReturn<T extends { [key: string]: unknown }> = ReturnType<typeof useCreateQuery<T>>

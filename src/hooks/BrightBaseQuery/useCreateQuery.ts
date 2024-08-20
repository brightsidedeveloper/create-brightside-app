import { BrightBaseCRUD, QueryOptions } from 'bsdweb'
import { useMemo } from 'react'

export default function useCreateQuery<T extends { [key: string]: unknown }>(
  table: BrightBaseCRUD<T>,
  params: Parameters<typeof table.read>,
  queryOptions?: Omit<QueryOptions<T[]>, 'queryKey' | 'queryFn'>
) {
  return useMemo(
    () => ({
      ...queryOptions,
      queryKey: [table.name, ...params],
      queryFn: () => table.read(...params),
    }),
    [params, queryOptions, table]
  )
}

export type UseBrightSuspenseQueryReturn<T extends { [key: string]: unknown }> = ReturnType<typeof useCreateQuery<T>>

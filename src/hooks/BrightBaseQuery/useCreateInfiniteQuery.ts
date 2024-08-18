import { BrightBaseCRUD, BrightQuery } from 'brightside-developer'
import { useMemo } from 'react'

function useCreateInfiniteQuery<T extends { [key: string]: unknown }>(
  table: BrightBaseCRUD<T>,
  pageSize: number,
  filters: Parameters<typeof table.read>[0] = {},
  queryOptions?: Omit<BrightQuery.QueryOptions<T[]>, 'queryKey' | 'queryFn'>
) {
  return useMemo(
    () => ({
      ...queryOptions,
      queryKey: [table.name, { pageSize, ...filters }],
      queryFn: ({ pageParam = 0 }) =>
        table.read(filters, {
          limit: pageSize,
          offset: pageParam * pageSize,
        }),
      getNextPageParam: (lastPage: T[], pages: T[][]) => {
        // Determine if there are more pages to load based on the last page data
        if (lastPage.length < pageSize) return undefined
        return pages.length
      },
    }),
    [queryOptions, table, filters, pageSize]
  )
}

export type UseBrightInfiniteQueryReturn<T extends { [key: string]: unknown }> = ReturnType<typeof useCreateInfiniteQuery<T>>

export default useCreateInfiniteQuery

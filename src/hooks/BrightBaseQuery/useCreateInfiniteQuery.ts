import { BrightBaseCRUD } from 'bsdweb'
import { useMemo } from 'react'

function useCreateInfiniteQuery<T extends { [key: string]: unknown }>(
  table: BrightBaseCRUD<T>,
  pageSize: number,
  params: [Parameters<typeof table.read>[0], Omit<Parameters<typeof table.read>[1], 'limit' | 'offset'>] = [{}, {}]
) {
  return useMemo(
    () => ({
      queryKey: [table.name, { pageSize }],
      queryFn: ({ pageParam }: { pageParam: number }) =>
        table.read(params[0], {
          ...params[1],
          limit: pageSize,
          offset: pageParam * 3,
        }),
      getNextPageParam: (lastPage: T[], pages: T[][]) => {
        // Determine if there are more pages to load based on the last page data
        if (lastPage.length < pageSize) return undefined
        return pages.length
      },
      initialPageParam: 0,
    }),
    [pageSize, params, table]
  )
}

export type UseCreateInfiniteQueryReturn<T extends { [key: string]: unknown }> = ReturnType<typeof useCreateInfiniteQuery<T>>

export default useCreateInfiniteQuery

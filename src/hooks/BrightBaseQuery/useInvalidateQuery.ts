import { QueryKey, useQueryClient } from 'bsdweb'
import { useCallback } from 'react'
import { UseBrightSuspenseQueryReturn } from './useCreateQuery'

export default function useInvalidateQuery<T extends { [key: string]: unknown }>(
  opts: UseBrightSuspenseQueryReturn<T> | { queryKey: QueryKey }
) {
  const queryClient = useQueryClient()

  const invalidate = useCallback(() => queryClient.invalidateQueries({ queryKey: opts.queryKey }), [queryClient, opts.queryKey])

  return invalidate
}

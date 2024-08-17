import { useCallback } from 'react'
import { UseBrightSuspenseQueryReturn } from './BrightBaseQuery/useCreateQuery'
import { BrightQuery } from 'brightside-developer'

export default function useInvalidateQuery<T extends { [key: string]: unknown }>(
  opts: UseBrightSuspenseQueryReturn<T> | { queryKey: BrightQuery.QueryKey }
) {
  const queryClient = BrightQuery.useQueryClient()

  const invalidate = useCallback(() => queryClient.invalidateQueries({ queryKey: opts.queryKey }), [queryClient, opts.queryKey])

  return invalidate
}

import { useVirtualizer } from '@tanstack/react-virtual'
import { useSuspenseInfiniteQuery } from 'bsdweb'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { UseCreateInfiniteQueryReturn } from './useCreateInfiniteQuery'

interface VirtualizerOptions {
  estimateSize: (index: number) => number
  overscan?: number
  horizontal?: boolean
}

export default function useSuspenseVirtualizedInfiniteMap<T extends { [key: string]: unknown }>(
  query: UseCreateInfiniteQueryReturn<T>,
  { estimateSize, overscan, horizontal = false }: VirtualizerOptions
) {
  const {
    data: { pages },
    fetchNextPage,
    ...queryRest
  } = useSuspenseInfiniteQuery(query)

  const [scrollViewMounted, setScrollViewMounted] = useState(false)

  const items = useMemo(() => pages.flat(), [pages])

  const scrollRef = useRef<HTMLDivElement | null>(null)
  scrollRef.current = scrollViewMounted ? document.querySelector('[data-radix-scroll-area-viewport]')! : null
  const virtualizer = useVirtualizer({
    count: items.length + (queryRest.isFetching ? 1 : 0),
    getScrollElement: () => scrollRef.current,
    overscan: overscan ?? 12,
    estimateSize,
    horizontal,
  })

  const vItems = virtualizer.getVirtualItems()

  const onScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    if (scrollTop + clientHeight + 500 >= scrollHeight && !queryRest.isFetching && queryRest.hasNextPage) fetchNextPage()
  }, [fetchNextPage, queryRest.hasNextPage, queryRest.isFetching])

  useEffect(() => {
    const { current: el } = scrollRef
    if (!el) return
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll, scrollViewMounted])

  return useMemo(
    () => ({ virtualizer, items, vItems, horizontal, queryRest, setScrollViewMounted }),
    [virtualizer, items, vItems, horizontal, queryRest]
  )
}

export type UseSuspenseVirtualizedInfiniteMapReturn<T extends { [key: string]: unknown }> = ReturnType<
  typeof useSuspenseVirtualizedInfiniteMap<T>
>

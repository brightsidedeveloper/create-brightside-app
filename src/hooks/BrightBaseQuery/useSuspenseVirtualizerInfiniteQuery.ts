import { useVirtualizer } from '@tanstack/react-virtual'
import { useSuspenseInfiniteQuery } from 'brightside-developer'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { UseBrightInfiniteQueryReturn } from './useCreateInfiniteQuery'

interface VirtualizerOptions {
  estimateSize: (index: number) => number
  overscan?: number
  horizontal?: boolean
}

export default function useSuspenseVirtualizerInfiniteQuery<T extends { [key: string]: unknown }>(
  query: UseBrightInfiniteQueryReturn<T>,
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
    count: items.length,
    getScrollElement: () => scrollRef.current,
    overscan: overscan ?? 12,
    estimateSize,
    horizontal,
  })

  const vItems = virtualizer.getVirtualItems()

  const onScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    if (scrollTop + clientHeight + 100 >= scrollHeight && !queryRest.isFetching) fetchNextPage()
  }, [fetchNextPage, queryRest.isFetching])

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

export type UseSuspenseVirtualizerInfiniteQueryReturn<T extends { [key: string]: unknown }> = ReturnType<
  typeof useSuspenseVirtualizerInfiniteQuery<T>
>

import { ReactNode, useMemo } from 'react'
import { c, tw } from 'brightside-developer'
import { UseSuspenseVirtualizerInfiniteQueryReturn } from '../../hooks/BrightBaseQuery/useSuspenseVirtualizerInfiniteQuery'
import { UseVirtualizerInfiniteQueryReturn } from '../../hooks/BrightBaseQuery/useVirtualizerInfiniteQuery'

interface VirtualizedInfiniteMapProps<T extends { [key: string]: unknown }> {
  className: string
  children: (item: T) => ReactNode
  loadingComponent?: JSX.Element
  horizontal?: boolean
}

export default function VirtualizedInfiniteMap<T extends { [key: string]: unknown }>({
  className,
  items,
  onScroll,
  scrollRef,
  vItems,
  virtualizer,
  queryRest: { isFetching, isLoading },
  loadingComponent,
  horizontal,
  children,
}: (UseSuspenseVirtualizerInfiniteQueryReturn<T> | UseVirtualizerInfiniteQueryReturn<T>) & VirtualizedInfiniteMapProps<T>) {
  const cn = useMemo(
    () => c('flex flex-col w-full min-h-20', tw(horizontal ? 'overflow-y-auto' : 'overflow-x-auto'), className),
    [className, horizontal]
  )
  if (isLoading) return loadingComponent
  return (
    <div ref={scrollRef} onScroll={onScroll} className={cn}>
      <div className="relative" style={{ height: virtualizer.getTotalSize() }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${vItems[0]?.start ?? 0}px)`,
          }}
        >
          {vItems.map((vRow) => {
            const item = items[vRow.index]
            return (
              <div key={vRow.key} data-index={vRow.index} ref={virtualizer.measureElement}>
                {children(item)}
              </div>
            )
          })}
        </div>
      </div>
      {isFetching && loadingComponent}
    </div>
  )
}

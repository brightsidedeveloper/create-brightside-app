import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo } from 'react'
import { c, tw } from 'bsdweb'
import { UseSuspenseVirtualizedInfiniteMapReturn } from '../../hooks/BrightBaseQuery/useSuspenseVirtualizerInfiniteQuery'
import { ScrollArea } from '../ui/shadcn/ui/scroll-area'

interface VirtualizedInfiniteMapProps<T extends { [key: string]: unknown }> {
  children: (item: T, index: number) => ReactNode
  className?: string
  loadingComponent?: JSX.Element
  horizontal?: boolean
}

export default function VirtualizedInfiniteMap<T extends { [key: string]: unknown }>({
  className,
  items,
  vItems,
  virtualizer,
  queryRest: { isLoading },
  loadingComponent,
  horizontal,
  setScrollViewMounted,
  children,
}: UseSuspenseVirtualizedInfiniteMapReturn<T> & VirtualizedInfiniteMapProps<T>) {
  const cn = useMemo(() => c('flex', tw(horizontal && 'flex-col'), className), [className, horizontal])
  if (isLoading) return loadingComponent
  return (
    <ScrollArea className={cn}>
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
            if (!item) return loadingComponent
            return (
              <div key={vRow.key} data-index={vRow.index} ref={virtualizer.measureElement}>
                {children(item, vRow.index)}
              </div>
            )
          })}
        </div>
      </div>
      <ScrollActiveController setScrollViewMounted={setScrollViewMounted} />
    </ScrollArea>
  )
}

function ScrollActiveController({ setScrollViewMounted }: { setScrollViewMounted: Dispatch<SetStateAction<boolean>> }) {
  useEffect(() => {
    setScrollViewMounted(true)
    return () => setScrollViewMounted(false)
  })

  return null
}

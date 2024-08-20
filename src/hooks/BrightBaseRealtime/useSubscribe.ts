import { BrightBaseRealtime } from 'bsdweb'
import { useEffect } from 'react'

export default function useSubscribe<T extends { [event: string]: { [event: string]: unknown } }>(channel: BrightBaseRealtime<T>) {
  useEffect(() => channel.subscribe(), [channel])
}

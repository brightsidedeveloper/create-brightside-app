import { EventCallback } from '@/types/bright.types'
import { BrightBaseRealtime } from 'bsdweb'
import { useEffect } from 'react'

export default function useEvent<T extends { [event: string]: { [event: string]: unknown } }, K extends keyof T>(
  channel: BrightBaseRealtime<T>,
  event: K,
  cb: EventCallback<T, K>
) {
  useEffect(() => channel.on(event, cb), [channel, event, cb])
}

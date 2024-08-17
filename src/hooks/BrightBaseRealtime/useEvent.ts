import { BrightBaseRealtime } from 'brightside-developer'
import { useEffect, useRef } from 'react'
import { EventCallback } from '../../api/Channels'

export default function useEvent<T extends { [event: string]: unknown }, K extends keyof T>(
  channel: BrightBaseRealtime<T>,
  event: K,
  cb: EventCallback<T, K>
) {
  const channelRef = useRef(channel)
  const cbRef = useRef(cb)
  channelRef.current = channel
  cbRef.current = cb
  useEffect(() => channelRef.current.on(event, cbRef.current), [event])
}

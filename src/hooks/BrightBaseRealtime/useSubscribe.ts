import { BrightBaseRealtime } from 'brightside-developer'
import { useEffect, useRef } from 'react'

export default function useSubscribe<T extends { [event: string]: unknown }>(channel: BrightBaseRealtime<T>) {
  const channelRef = useRef(channel)
  channelRef.current = channel
  useEffect(() => channelRef.current.subscribe(), [])
}

export interface RealtimeEvents {
  [event: string]: unknown
}

export type EventCallback<K extends RealtimeEvents, T extends keyof K> = (payload: K[T]) => void

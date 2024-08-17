import { createRootRoute, Outlet } from '@tanstack/react-router'
import { BrightQueryDevTools, BrightWebTheme } from 'brightside-developer'

export const Route = createRootRoute({
  beforeLoad() {
    BrightWebTheme.initializeTheme()
    BrightWebTheme.mediaThemeEventListener()
    BrightWebTheme.storageThemeEventListener()
  },
  component: () => (
    <>
      <Outlet />
      {!import.meta.env.PROD && <BrightQueryDevTools />}
    </>
  ),
})

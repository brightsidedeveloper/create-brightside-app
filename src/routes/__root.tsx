import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { BrightQueryDevTools, BrightWebTheme } from 'bsdweb'

export const Route = createRootRoute({
  beforeLoad() {
    BrightWebTheme.initializeTheme()
    BrightWebTheme.mediaThemeEventListener()
    BrightWebTheme.storageThemeEventListener()
  },
  component: () => (
    <>
      <Outlet />
      {!import.meta.env.PROD && (
        <>
          <BrightQueryDevTools />
          <TanStackRouterDevtools />
        </>
      )}
    </>
  ),
})

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/shadcn/ui/resizable'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/ui/avatar'
import DropDown from '@/components/ui/DropDown'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import Tooltip from '@/components/ui/Tooltip'
import Accordion from '@/components/ui/Accordion'
import { Command } from '@/components/ui/Command'
import { Button } from '@/components/ui/shadcn/ui/button'
import { MenuBar } from '@/components/ui/MenuBar'
import ContextMenu from '@/components/ui/ContextMenu'
import { Drawer } from '@/components/ui/shadcn/ui/drawer'
import SheetContent from '@/components/ui/sheet/SheetContent'
import { DrawerContent } from '@/components/ui/drawer/DrawerContent'
import { Sheet } from '@/components/ui/shadcn/ui/sheet'
import { Switch } from '@/components/ui/shadcn/ui/switch'
import { Suspense, useCallback, useState } from 'react'
import { BrightBaseEdge, BrightBaseRealtime, tw, wetToast } from 'bsdweb'
import useSubscribe from '@/hooks/BrightBaseRealtime/useSubscribe'
import useEvent from '@/hooks/BrightBaseRealtime/useEvent'
import { Label } from '@/components/ui/shadcn/ui/label'
import useCreateInfiniteQuery from '@/hooks/BrightBaseQuery/useCreateInfiniteQuery'
import FakeTables from '@/api/FakeTables'
import VirtualizedInfiniteMap from '@/components/BrightBaseQuery/VirtualizedInfiniteMap'
import useSuspenseVirtualizedInfiniteMap from '@/hooks/BrightBaseQuery/useSuspenseVirtualizerInfiniteQuery'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/shadcn/ui/card'
import { Loader2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/shadcn/ui/scroll-area'
import { Skeleton } from '@/components/ui/shadcn/ui/skeleton'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="size-screen">
      <Header />
      <ResizablePanelGroup className="[max-width:1920px] mx-auto border-l border-r" direction="horizontal">
        {/*  */}
        <ResizablePanel defaultSize={70}>
          <WelcomeAndDocs />
        </ResizablePanel>
        {/*  */}
        <ResizableHandle />
        {/*  */}
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            {/*  */}
            <ResizablePanel>
              <Suspense
                fallback={
                  <ScrollArea className="p-4">
                    {[...Array(5)].map((_, i) => (
                      <Card className={tw('mb-4', i === 0 && 'mt-4')}>
                        <CardHeader>
                          <CardTitle>
                            <Skeleton className="h-[16px] w-24 rounded-full mb-1" />
                          </CardTitle>
                          <CardDescription>
                            <Skeleton className="h-[12px] w-72 rounded-full" />
                            <div className="h-[2px] w-full" />
                            <Skeleton className="h-[12px] w-32 rounded-full mb-3" />
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-[16px] w-32 rounded-full" />
                        </CardContent>
                        <CardFooter className="flex justify-between opacity-20">
                          <Skeleton className="w-20 h-10 " />
                          <Skeleton className="w-20 h-10" />
                        </CardFooter>
                      </Card>
                    ))}
                  </ScrollArea>
                }
              >
                <VirtualizeInfiniteScroll />
              </Suspense>
            </ResizablePanel>
            {/*  */}
            <ResizableHandle />
            {/*  */}
            <ResizablePanel>
              <FullShadcnSupport />
            </ResizablePanel>
            {/*  */}
          </ResizablePanelGroup>
        </ResizablePanel>
        {/*  */}
      </ResizablePanelGroup>
    </div>
  )
}

function Header() {
  return (
    <header className="h-12 border-b shadow-sm flex items-center justify-center">
      <div className="px-2 flex items-center justify-between w-full [max-width:1920px]">
        <span className="font-semibold text-xl">BrightStack Official</span>
        <div className="w-fit flex items-center gap-3">
          <Command>
            {({ setOpen }) => (
              <Button variant="ghost" size="icon" className="flex flex-col" onClick={() => setOpen((curr) => !curr)}>
                <div className="text-[10px] [line-height:0.75rem]">Crtl</div>
                <div className="text-[10px] [line-height:0.75rem]">+ K</div>
              </Button>
            )}
          </Command>

          <ThemeToggle />

          <DropDown>
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="name" />
              <AvatarFallback>NAME</AvatarFallback>
            </Avatar>
          </DropDown>
        </div>
      </div>
    </header>
  )
}

function WelcomeAndDocs() {
  return (
    <div className="p-10 w-full flex justify-center items-center flex-col gap-4 h-[calc(100dvh-3rem)] @container">
      <div className="p-8 rounded-3xl border bg-card shadow-md dark:shadow-xl w-full max-w-[600px]">
        <h3 className="text-3xl @md:text-5xl @2xl:text-7xl pb-5">Welcome Home!</h3>
        <p className="text-xl">Enjoy Coding!</p>
      </div>
      <div className="flex gap-6 items-center">
        <img src="/Bright.svg" alt="BrightStack Logo" className="w-20 @md:w-32 @2xl:w-48 rounded-3xl shadow-md dark:shadow-xl" />
        <div>
          <h4 className="text-lg @md:text-4xl @2xl:text-6xl @2xl:pb-5 font-semibold">BrightSide!</h4>
          <p className="text-xs @md:text-sm @lg:text-base">
            There are a lot of things you can do with BrightStack.
            <br /> Check out the docs to learn more.
          </p>
          <span className="text-xs @md:text-sm @lg:text-base">
            <Tooltip content="Wow, tooltip support!">
              <a href="https://brightside-developer-docs.vercel.app" className="text-primary underline mr-5">
                BrightSide API Docs
              </a>
            </Tooltip>
            <Tooltip content="Wow, tooltip support!">
              <a href="https://github.com/brightsidedeveloper/brightside-developer" className="text-primary underline">
                BrightSide API Github
              </a>
            </Tooltip>
          </span>
        </div>
      </div>

      <p className="text-center max-w-xl">
        // TODO: React Hook form that posts to my data base with a powerful crud hook pattern that is unbelievably reusable and easy to
        implement!
      </p>

      <Accordion />
    </div>
  )
}

function VirtualizeInfiniteScroll() {
  const query = useCreateInfiniteQuery(FakeTables.todos, 20)
  const props = useSuspenseVirtualizedInfiniteMap(query, { estimateSize: (i) => (i === 0 ? 247 : 231) })
  return (
    <VirtualizedInfiniteMap
      {...props}
      className="size-full px-4 animate-in"
      loadingComponent={
        <div className="flex-1 w-full h-[147px] flex items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      }
    >
      {(item, i) => (
        <Card className={tw('mb-4', i === 0 && 'mt-4')}>
          <EdgeFunction {...item} />
        </Card>
      )}
    </VirtualizedInfiniteMap>
  )
}

function FullShadcnSupport() {
  return (
    <div className="size-full flex flex-col gap-4 p-4">
      <Drawer>
        <MenuBar />
        <DrawerContent />
      </Drawer>
      <Sheet>
        <ContextMenu className="flex size-full items-center justify-center rounded-md border border-dashed text-sm">
          <RealtimeDemo />
        </ContextMenu>
        <SheetContent />
      </Sheet>
    </div>
  )
}

type Events = {
  checked: { toggle: boolean }
}

const listener = new BrightBaseRealtime<Events>('room1')
const emitter = new BrightBaseRealtime<Events>('room1')

function RealtimeDemo() {
  const [checked, setChecked] = useState(false)

  useSubscribe(listener)
  useEvent(listener, 'checked', ({ toggle }) => setChecked(toggle))

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="realtime">Realtime Switch</Label>
      <Switch id="realtime" checked={checked} onCheckedChange={() => emitter.emit('checked', { toggle: !checked })} />
    </div>
  )
}

type Functions = {
  ai: { message: string }
}

const edge = new BrightBaseEdge<Functions>()

function EdgeFunction({ label }: { label: string }) {
  const [aiRes, setAiRes] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const go = useCallback(
    () =>
      edge
        .first(() => setLoading(true))
        .invoke('ai', { message: label })
        .then(setAiRes)
        .catch(() => wetToast("This edge function doesn't exist, check out bsdserv on npm for blessing. To ez 🤣", { icon: '❌' }))
        .finally(() => setLoading(false)),
    [label]
  )

  return (
    <>
      <CardHeader>
        <CardTitle>BrightSide</CardTitle>
        <CardDescription>
          Themed and virtualized scroll with infinite suspense query from generated supabase schemas in seconds.
        </CardDescription>
      </CardHeader>
      <CardContent>{aiRes ?? label}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={go} disabled={loading}>
          {loading ? <Loader2 className="size-5 animate-spin mx-5" /> : 'Invoke AI'}
        </Button>
      </CardFooter>
    </>
  )
}

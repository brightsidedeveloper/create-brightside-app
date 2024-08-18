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
import { useState } from 'react'
import { BrightBaseRealtime, tw } from 'brightside-developer'
import { RealtimeEvents } from '@/types/bright.types'
import useSubscribe from '@/hooks/BrightBaseRealtime/useSubscribe'
import useEvent from '@/hooks/BrightBaseRealtime/useEvent'
import { Label } from '@/components/ui/shadcn/ui/label'
import useCreateInfiniteQuery from '@/hooks/BrightBaseQuery/useCreateInfiniteQuery'
import FakeTables from '@/api/FakeTables'
import VirtualizedInfiniteMap from '@/components/BrightBaseQuery/VirtualizedInfiniteMap'
import useSuspenseVirtualizerInfiniteQuery from '@/hooks/BrightBaseQuery/useSuspenseVirtualizerInfiniteQuery'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/shadcn/ui/card'
import { Loader2 } from 'lucide-react'
import Carousel from '@/components/ui/Carousel'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="size-screen">
      <Header />
      <ResizablePanelGroup className="max-w-screen-2xl mx-auto border-l border-r" direction="horizontal">
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
              <VirtualizeInfiniteScroll />
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
      <div className="px-2 flex items-center justify-between w-full max-w-screen-2xl">
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
      <Accordion />
      <Carousel />
    </div>
  )
}

function VirtualizeInfiniteScroll() {
  const query = useCreateInfiniteQuery(FakeTables.todos, 20)
  const props = useSuspenseVirtualizerInfiniteQuery(query, { estimateSize: (i) => (i === 0 ? 247 : 231) })
  return (
    <VirtualizedInfiniteMap
      {...props}
      className="size-full px-4"
      loadingComponent={
        <div className="flex-1 size-full flex items-center justify-center">
          <Loader2 className="size-12" />
        </div>
      }
    >
      {({ label }, i) => (
        <Card className={tw('mb-4', i === 0 && 'mt-4')}>
          <CardHeader>
            <CardTitle>BrightSide</CardTitle>
            <CardDescription>Themed virtualized scroll with infinite suspense query from generated supabase in seconds.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{label}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
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

interface Events extends RealtimeEvents {
  checked: boolean
}

const listener = new BrightBaseRealtime<Events>('room1')
const emitter = new BrightBaseRealtime<Events>('room1')

function RealtimeDemo() {
  const [checked, setChecked] = useState(false)

  useSubscribe(listener)
  useEvent(listener, 'checked', setChecked)

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="realtime">Realtime Switch</Label>
      <Switch id="realtime" checked={checked} onCheckedChange={() => emitter.emit('checked', !checked)} />
    </div>
  )
}

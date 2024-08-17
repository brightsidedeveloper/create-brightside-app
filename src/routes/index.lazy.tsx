import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-10 flex justify-center items-center flex-col gap-4 h-screen">
      <div className="p-8 rounded-3xl border bg-background-two shadow-md dark:shadow-xl w-fit">
        <h3 className="text-7xl pb-5">Welcome Home!</h3>
        <p className="text-xl">Enjoy Coding!</p>
      </div>

      <div className="flex gap-6 items-center">
        <img src="/Bright.svg" alt="BrightStack Logo" className="w-48 rounded-3xl shadow-md dark:shadow-xl" />
        <div>
          <h4 className="text-6xl pb-12">BrightSide!</h4>
          <p>
            There are a lot of things you can do with BrightStack.
            <br /> Check out the docs to learn more.
          </p>
          <span>
            <a href="https://brightside-developer-docs.vercel.app" className="text-primary underline mr-5">
              BrightSide API Docs
            </a>
            <a href="https://github.com/brightsidedeveloper/brightside-developer" className="text-primary underline">
              BrightSide API Github
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

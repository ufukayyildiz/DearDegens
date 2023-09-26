import Link from "next/link"
import { Button} from "../components/components-ui/Button"
import { authOptions } from "../lib/auth/auth-options"
import { getServerSession } from "next-auth"

export default async function IndexPage() {
  
  const session = await getServerSession(authOptions)
  console.log('Session:', session)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="my-auto h-1/2 w-full">
            {session?.user ? (
              <div className="flex flex-col gap-5">
                <p className="w-62 text-md mx-auto md:text-lg">
                  {`Welcome to PepperMint!`}
                </p>
                <Link href="/p/home">
                  <Button
                    variant="outline"
                    className="mx-auto flex w-44 rounded-full border-cyan-500 bg-rose-600 font-bold text-zinc-50 shadow-lg hover:border hover:bg-rose-400"
                  >
                    CONTINUE
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <p className="w-62 text-md mx-auto md:text-lg">
                  Sign in to get started
                </p>
                <Link href="/signin">
                  <Button
                    variant="outline"
                    className="mx-auto flex w-44 rounded-full border-cyan-500 bg-rose-600 font-bold text-zinc-50 shadow-lg hover:border hover:bg-rose-400"
                  >
                    SIGN IN
                  </Button>
                </Link>
              </div>
            )}
          </div>
    </section>
  )
}

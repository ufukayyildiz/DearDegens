import { FC } from "react"
import MintAuth from "@/src/components/pageAuth/MintAuth"
import Image from "next/image"
import Logo from "@/src/assets/DearDegens.png"

const page: FC = () => {
  return (
    <div className="mx-auto grid h-full w-11/12 grid-cols-1 md:grid-cols-2">
      <div className="mx-auto mt-16 hidden h-[70vh] w-11/12 flex-col items-center justify-center gap-5 rounded-[50px] bg-muted p-12 shadow-lg md:flex xl:w-10/12 dark:bg-muted-foreground">
        <Image
          src={Logo}
          alt="deardegens"
          className="flex w-8/12 justify-center"
        />
        <p>
          &quot;..welcome to a new experience in the online second-hand goods
          market. DearDegens.com is the answer to life&apos;s most challenging
          questions, questions such as{" "}
          <span className="italic">&quot;Is it still available?&quot;</span> and{" "}
          <span className="italic">&quot;Are you still interested?&quot;</span>
        </p>
        <p>
          We know (oh yes.. we know..) the challenges facing everyday users in
          the second-hand goods market, and it is our mission to face these
          challenges head-on.&quot;
        </p>
      </div>
      <MintAuth />
    </div>
  )
}

export default page

import React from "react"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Image from "next/image"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../components-ui/Tabs"
import Logo from "@/src/assets/DearDegens.png"

export default function MintAuth() {
  return (
    <div className="mx-auto mb-36 mt-5 flex h-auto min-h-screen w-11/12 flex-col items-center md:mt-16 xl:w-8/12">
      <Image
        src={Logo}
        alt="deardegens"
        className="my-5 flex w-8/12 justify-center md:hidden"
      />
      <Tabs defaultValue="signin" className="mb-40 h-full w-full md:mb-0">
        <TabsList className="mb-5 w-full space-x-5">
          <TabsTrigger value="signin" className="w-full ">
            LOGIN
          </TabsTrigger>
          <TabsTrigger value="signup" className="w-full ">
            REGISTER
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignIn />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  )
}

import React from "react"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../components-ui/Tabs"

export default function MintAuth() {
  return (
    <div className="mx-auto mb-36 mt-5 h-auto  w-11/12 items-center md:mt-16 xl:w-8/12">
      <Tabs defaultValue="signin" className="h-full w-full">
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

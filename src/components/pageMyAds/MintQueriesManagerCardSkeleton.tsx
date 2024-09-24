import React from "react"
import { Button } from "../components-ui/Button"
import { MessageCircle } from "lucide-react"

import MintQueryReply from "../pageMintQueries/MintQueryReply"

export default function MintQueriesManagerCardSkeleton() {
  return (
    <div className="relative z-40 mx-auto mb-3 flex h-auto min-h-[100px] w-11/12 max-w-[500px] animate-pulse flex-col overflow-hidden rounded-lg border border-muted p-2 text-left text-primary shadow-lg sm:text-sm">
      <div className="mb-3 flex items-center space-x-2 text-xs font-bold italic text-customAccent">
        <p className="h-6 w-1/2 rounded-full bg-muted"></p>
      </div>
      <div className="md:ml-5">
        <p className="mb-5 h-10 rounded-lg bg-muted p-2 italic"></p>
      </div>
      <div className="mb-10 ml-5 flex w-full flex-col space-y-2 md:ml-8">
        <span className="h-3 w-11/12 rounded-full bg-muted"></span>
        <span className="h-3 w-11/12 rounded-full bg-muted"></span>
      </div>
      <div className="absolute bottom-0 w-full ">
        <div className="flex h-8 w-full items-center justify-between ">
          <p className="text-xs italic text-muted-foreground">Sent 01 Jan 24</p>
          <div>
            <Button className="text-muted" variant="icon">
              <MessageCircle />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

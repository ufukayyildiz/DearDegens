import React from "react"
import { queryType } from "@/src/types/db"

interface QAProps {
  queries: queryType[]
}

export default function MintQA({ queries }: QAProps) {
  return (
    <div className="mt-5">
      {queries &&
        queries.map((qa) => {
          if (qa.isPublic === true) {
            return (
              <div className="flex w-full flex-col">
                <div className="flex space-x-5">
                  <p className="w-5 font-bold">Q:</p>
                  <p className="w-full">{qa.query}</p>
                </div>
                <div className="flex space-x-5">
                  <p className="w-5 font-bold">A:</p>
                  <p className="w-full italic text-customAccent">{qa.reply}</p>
                </div>
                <hr className="my-2 border border-t-muted" />
              </div>
            )
          }
        })}
    </div>
  )
}

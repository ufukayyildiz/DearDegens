"use client"
import React, { useState, useEffect, useRef } from "react"
import { Input } from "../components-ui/Input"
import { Button } from "../components-ui/Button"
import { ScrollArea } from "../components-ui/ScrollArea"

export default function MessageBoard() {
  const bottomRef = useRef<HTMLDivElement>(null)


  const [message, setMessage] = useState<string>()
  const [messagesRecieved, setMessagesReceived] = useState<any[]>([])

  


  // FORMAT TIMESTAMP
  function formatDateFromTimestamp(timestamp: Date) {
    const date = new Date(timestamp)

    const day = date.getDate()
    const month = date.toLocaleString("default", { month: "short" })
    const hour = date.getHours()
    const minute = date.getMinutes()

    const formattedDate = `${day} ${month} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

    return formattedDate
  }

  // FOCUS ON NEW MESSAGE
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messagesRecieved])

  return (
    <div className="relative flex h-full w-full">
      <h1 className="absolute -top-0 z-40 w-full bg-background p-2 text-left font-bold text-primary">
        Messages:
      </h1>
      <div className="absolute bottom-20 flex h-full w-full flex-col justify-end rounded-md">
        <ScrollArea className="mt-32 pr-5">
          {messagesRecieved.map((msg, i) => (
            <div
              className="mt-3 flex flex-col justify-center rounded-md border border-muted bg-background p-2 shadow-lg"
              key={i}
              ref={i === messagesRecieved.length - 1 ? bottomRef : null}
            >
              <div className="flex justify-between">
                <span className="flex font-bold text-customAccent">
                  {msg.username}
                </span>
              </div>
              <p className="p-1 text-left text-primary">{msg.message}</p>
              <span className="flex w-full justify-end text-xs italic text-muted-foreground">
                {formatDateFromTimestamp(msg.__createdtime__)}
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="absolute bottom-5 mt-5 flex w-full flex-row items-center justify-center">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-10 w-full text-primary"
        />
        <Button
          variant="outline"
          className="ml-3 text-primary"
        >
          Send
        </Button>
      </div>
    </div>
  )
}

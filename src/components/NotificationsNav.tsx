"use client"

import Link from "next/link"
import { Bell } from "lucide-react"

import { formatTimeToNow } from "../lib/utils"
import { notificationsType } from "../types/db"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components-ui/DropdownMenu"
import { useEffect, useState } from "react"

interface NotificationsNavProps {
  notification: notificationsType
}

export function NotificationsNav({ notification }: NotificationsNavProps) {
  // const [unReadNotifications, setUnReadNotifications] = useState<number>(0)

  
  const isReadArray = []
  for (let i = 0; i < notification.length; i++) {
    if (notification[i].isRead === false) {
      isReadArray.push(notification[i].isRead)
    }
  }
  // setUnReadNotifications(isReadArray.length)
  const note = isReadArray.length
  // useEffect(() => {
  // }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <Bell className="w-6 h-6" />
          {note > 0 && (
            <div className="absolute -top-3 -right-3 w-auto min-w-[20px] h-5 bg-red-500 content-center rounded-full px-2 shadow-md">
              <p className="h-full my-auto text-white text-xs text-center inline-block align-middle">
                {note}
              </p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative bg-background w-96" align="end">
        <h1 className="font-bold">Notifications</h1>
        {notification.map((notify: any, index: number) => (
          <div key={index} className="relative">
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/notification/${notify.id}`}
                className="grid grid-cols-1 content-start"
              >
                <h1>{notify.title}</h1>
                <div className="flex max-h-40 gap-1 text-xs italic text-zinc-400">
                  <span>Created</span>
                  {formatTimeToNow(new Date(notify.createdAt))}
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

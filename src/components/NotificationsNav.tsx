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
  const [unReadNotifications, setUnReadNotifications] = useState<number>(0)

  const isReadArray = []
  for (let i = 0; i < notification.length; i++) {
    if (notification[i].isRead === false) {
      isReadArray.push(notification[i].isRead)
    }
  }

  useEffect(() => {
    setUnReadNotifications(isReadArray.length)
  }, [isReadArray])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <Bell className="w-6 h-6" />
          {unReadNotifications > 0 && (
            <div className="absolute flex -top-3 -right-3 w-6 h-6 bg-red-500 content-center rounded-full shadow-md">
              <p className="absolute top-1 right-2 text-white text-xs text-center">
                {unReadNotifications}
              </p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative w-96 " align="end">
        <h1 className="font-bold">Notifications</h1>
        {notification.map((notify: any, index: number) => (
          <div key={index} className="relative">
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/notification/${notify.id}`}
                className="grid grid-cols-1 content-start"
              >
                <h1 className="font-semibold">{notify.title}</h1>
                <div className="flex max-h-40 gap-1 text-xs italic text-secondary">
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

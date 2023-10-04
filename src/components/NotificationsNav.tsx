"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"

import { formatTimeToNow } from "../lib/utils"
import { notificationsType } from "../types/db"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components-ui/Dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components-ui/DropdownMenu"

interface NotificationsNavProps {
  notification: notificationsType
}

type Notication = {
  id: string
  title: string
  body: string
  createdAt: Date
}

export function NotificationsNav({ notification }: NotificationsNavProps) {
  const [unReadNotifications, setUnReadNotifications] = useState<number>(0)
  const [selectedNotificationId, setSelectedNotificationId] =
    useState<string>("")
  const [displayedNotification, setDisplayedNotification] =
    useState<Notication | null>()
  console.log("notify:", displayedNotification)

  useEffect(() => {
    const selectedNotification = notification.find(
      (notifications: any) => notifications.id === selectedNotificationId
    )
    if (selectedNotification) {
      setDisplayedNotification(selectedNotification)
    }
  }, [selectedNotificationId])

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
    <div>
      <Dialog>
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
                {/* setState the notification ID onClick */}
                <DialogTrigger
                  onClick={() => setSelectedNotificationId(notify.id)}
                >
                  <DropdownMenuItem asChild>
                    <div className="grid grid-cols-1 content-start">
                      <h1 className="font-semibold">{notify.title}</h1>
                      <div className="flex max-h-40 gap-1 text-xs italic text-secondary">
                        <span>Created</span>
                        {formatTimeToNow(new Date(notify.createdAt))}
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DialogTrigger>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {displayedNotification && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-5">
                {displayedNotification.title}
              </DialogTitle>
              <DialogDescription className="text-primary">
                <p className="mb-5">{displayedNotification.body}</p>
                <Link href={`/p/mint/${displayedNotification.id}`}>
                  <p className="italic">Follow this link to the ad</p>
                </Link>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex max-h-40 gap-1 text-xs italic text-secondary">
                <span>Created</span>
                {formatTimeToNow(new Date(displayedNotification.createdAt))}
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

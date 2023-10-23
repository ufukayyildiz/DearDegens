"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Bell, MoreVertical } from "lucide-react"

import { formatTimeToNow } from "../lib/utils"
import { notificationsType } from "../types/db"
import { setUnReadNotifications } from "./components-global/store"
import { Button } from "./components-ui/Button"
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
  userNotifications: notificationsType
}

type Notication = {
  id: string
  adId: string
  title: string
  body: string
  createdAt: Date
}

export function NotificationsNav({ userNotifications }: NotificationsNavProps) {
  const notifications = [...userNotifications]
  notifications.sort((a: any, b: any) => b.createdAt - a.createdAt)
  const router = useRouter()
  const [unreadNotifications, setUnreadNotifications] = useState<number>()
  const [selectedNotificationId, setSelectedNotificationId] =
    useState<string>("")
  const [displayedNotification, setDisplayedNotification] =
    useState<Notication | null>()

  const handleNotificationSelected = async (notify: any) => {
    setSelectedNotificationId(notify.id)
    try {
      const response = await axios.put("/api/readNotification", notify.id)
      const updatedIsRead = response.data
      setUnReadNotifications(updatedIsRead)
      router.refresh()
      return "Notification successfully read"
    } catch (error) {
      console.error("Error updating notification read status:", error)
    }
  }

  const getUnreadArray = () => {
    if (notifications) {
      const unread = []
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].isRead === false) {
          unread.push(notifications[i])
        }
      }
      setUnreadNotifications(unread.length)
    }
  }

  useEffect(() => {
    getUnreadArray()
  }, [selectedNotificationId, notifications])

  useEffect(() => {
    if (notifications) {
      const selectedNotification = notifications.find(
        (notifications: any) => notifications.id === selectedNotificationId
      )
      if (selectedNotification) {
        setDisplayedNotification(selectedNotification)
      }
    }
  }, [selectedNotificationId])

  return (
    <div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative">
              <Bell className="w-6 h-6" />
              {unreadNotifications !== undefined && unreadNotifications > 0 && (
                <div className="absolute flex -top-3 -right-3 w-6 h-6 bg-red-500 content-center rounded-full shadow-md">
                  <p className="absolute top-1 w-full mx-auto text-white text-xs text-center">
                    {unreadNotifications}
                  </p>
                </div>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="relative max-h-[350px] overflow-y-auto"
            align="end"
          >
            <h1 className="font-bold text-2xl">Notifications</h1>
            <div className="w-full flex py-2 justify-between">
              <Button variant="outline">Mark all as read</Button>
              <Button variant="outline">Delete all</Button>
            </div>
            {notifications &&
              notifications.map((notify: any, index: number) => (
                <div key={index} className="relative">
                  <DropdownMenuSeparator />

                  {notify.isRead === false ? (
                    <DropdownMenuItem asChild className="text-start">
                      <div className="grid grid-cols-1 w-72 content-start border-teal-500 border-2 bg-teal-300/10">
                        <DialogTrigger
                          onClick={() => handleNotificationSelected(notify)}
                        >
                          <h1 className="text-start font-semibold truncate">
                            {notify.title}
                          </h1>
                          <div className="flex max-h-40 gap-1 text-xs italic text-secondary">
                            <span>Created</span>
                            {formatTimeToNow(new Date(notify.createdAt))}
                          </div>
                        </DialogTrigger>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button className="w-10 h-10 bg-transparent group hover:bg-white border border-transparent rounded-full shadow-none hover:shadow-md absolute top-1 right-1">
                              <MoreVertical className="w-6 h-6 mx-auto text-transparent group-hover:text-zinc-800 rounded-full absolute top-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="relative max-h-[350px] overflow-y-auto"
                            align="end"
                          >
                            <DropdownMenuItem asChild className="text-start">
                              <p>Delete</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="text-start">
                              <p>Mark as read</p>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild className="text-start">
                      <div className="relative grid grid-cols-1 w-72 content-start">
                        <DialogTrigger
                          onClick={() => handleNotificationSelected(notify)}
                        >
                          <h1 className="text-start font-semibold truncate">
                            {notify.title}
                          </h1>
                          <div className="flex max-h-40 gap-1 text-xs italic text-secondary">
                            <span>Created</span>
                            {formatTimeToNow(new Date(notify.createdAt))}
                          </div>
                        </DialogTrigger>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button className="w-10 h-10 bg-transparent group hover:bg-white border border-transparent rounded-full shadow-none hover:shadow-md absolute top-1 right-1">
                              <MoreVertical className="w-6 h-6 mx-auto text-transparent group-hover:text-zinc-800 rounded-full absolute top-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="relative max-h-[350px] overflow-y-auto"
                            align="end"
                          >
                            <DropdownMenuItem asChild className="text-start">
                              <p>Delete</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="text-start">
                              <p>Mark as read</p>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </DropdownMenuItem>
                  )}
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
                <Link href={`/p/mint/${displayedNotification.adId}`}>
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

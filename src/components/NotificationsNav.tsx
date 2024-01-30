"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/components-ui/AlertDialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Bell, Loader, MoreVertical } from "lucide-react"

import { toast } from "../hooks/use-toast"
import { formatTimeToNow } from "../lib/utils"
import { useGetNotifications } from "./components-global/services"
import { notificationsType } from "../types/db"
import { Button } from "./components-ui/Button"
import { Checkbox } from "./components-ui/Checkbox"
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
  userId: any
}

export function NotificationsNav({ userId }: NotificationsNavProps) {
  // STATE
  const [disabled, setDisabled] = useState<boolean>(true)
  const [unreadNotifications, setUnreadNotifications] = useState<number>()
  const [selectedNotificationId, setSelectedNotificationId] =
    useState<string>("")
  const [displayedNotification, setDisplayedNotification] =
    useState<notificationsType>()

  // QUERIES
  const queryClient = useQueryClient()
  const notifications = useGetNotifications().data
  const isFetching = useGetNotifications().isFetching

  // MUTATION: Read Notification
  const { mutate: handleReadNotification } = useMutation({
    mutationFn: async (notify: any) => {
      setSelectedNotificationId(notify.id)
      const notifyId = JSON.stringify(notify.id)
      await axios.put("/api/readNotification", notifyId)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Error updating notification status. Please try again.",
        variant: "destructive",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["notify"] })
      }
    },
  })

  // MUTATION: Read all notifications
  const { mutate: handleReadAllNotifications } = useMutation({
    mutationFn: async (userId: any) => {
      const usersId = JSON.stringify(userId)
      await axios.put("/api/readAllNotifications", usersId)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Error updating notification status. Please try again.",
        variant: "destructive",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["notify"] })
      }
    },
  })

  // MUTATION: Delete notifications
  const { mutate: handleDeleteNotification } = useMutation({
    mutationFn: async (notify: any) => {
      const notifyId = JSON.stringify(notify.id)
      await axios.put("/api/deleteNotification", notifyId)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Error deleting notification. Please try again.",
        variant: "destructive",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["notify"] })
      }
    },
  })

  // MUTATION: Delete all notifications
  const { mutate: handleDeleteAllNotifications } = useMutation({
    mutationFn: async (userId: any) => {
      const usersId = JSON.stringify(userId)
      await axios.put("/api/deleteAllNotifications", usersId)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Error deleting notification. Please try again.",
        variant: "destructive",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["notify"] })
      }
    },
  })

  useEffect(() => {
    // Get array of unread notifications
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
    getUnreadArray()
  }, [selectedNotificationId, notifications])

  // Set the currently selected notification by ID
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
              <Bell className="h-6 w-6" />
              <div className="absolute -right-3 -top-3 flex h-6 w-6 content-center rounded-full bg-red-500 shadow-md">
                {isFetching === true ? (
                  <Loader
                    className="absolute top-1 mx-auto w-full animate-spin text-white"
                    size={15}
                  />
                ) : (
                  <p className="absolute top-1 mx-auto w-full text-center text-xs text-white">
                    {unreadNotifications}
                  </p>
                )}
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="relative max-h-[350px] w-[312px] overflow-y-auto"
            align="end"
          >
            <h1 className="text-2xl font-bold">Notifications</h1>

            <div className="flex w-full justify-between py-2">
              <Button
                onClick={() => handleReadAllNotifications(userId)}
                variant="outline"
                className="bg-muted"
              >
                Mark all as read
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="passivedestructive" className="bg-muted">
                    Delete all
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete all notifications?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      all notifications from your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <div className="flex w-full justify-between">
                      <div className="flex items-center justify-start space-x-2">
                        <Checkbox
                          id="disable"
                          checked={!disabled}
                          onCheckedChange={() => setDisabled(!disabled)}
                        />
                        <label
                          htmlFor="disable"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Confirm deletion of all notifications.
                        </label>
                      </div>
                      <div>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogTrigger asChild>
                          <Button
                            onClick={() => handleDeleteAllNotifications(userId)}
                            disabled={disabled}
                            variant="destructive"
                            className="ml-5"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                      </div>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {notifications &&
              notifications.map((notify: any, index: number) => (
                <div key={index} className="relative">
                  <DropdownMenuSeparator />

                  {notify.isRead === false ? (
                    <DropdownMenuItem asChild className="text-start">
                      <div className="grid w-72 grid-cols-1 content-start bg-orange-500/20">
                        <DialogTrigger
                          onClick={() => handleReadNotification(notify)}
                        >
                          <h1 className="w-10/12 truncate text-start font-semibold">
                            {notify.title}
                          </h1>
                          <div className="flex max-h-40 gap-1 text-xs italic text-secondary">
                            <span>Created</span>
                            {formatTimeToNow(new Date(notify.createdAt))}
                          </div>
                        </DialogTrigger>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button
                              onClick={() => {
                                setSelectedNotificationId(notify.id)
                              }}
                              className="group absolute right-1 top-1  h-10 w-10 rounded-full border border-transparent bg-transparent shadow-none hover:bg-transparent"
                            >
                              <MoreVertical className="absolute top-2 mx-auto h-6 w-6 rounded-full text-transparent hover:text-customAccent" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            className="flex flex-col gap-1 overflow-y-auto"
                            align="end"
                          >
                            <Button
                              onClick={() => {
                                setSelectedNotificationId(notify.id)
                                handleDeleteNotification(notify)
                              }}
                              variant="outline"
                              className="flex h-8 w-full border border-transparent bg-transparent text-start shadow-none"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={() => handleReadNotification(notify)}
                              variant="outline"
                              className="flex h-8 w-full border border-transparent bg-transparent text-start shadow-none"
                            >
                              Mark as read
                            </Button>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild className="group text-start">
                      <div className="relative grid w-72 grid-cols-1 content-start">
                        <DialogTrigger
                          onClick={() => handleReadNotification(notify)}
                        >
                          <h1 className="w-10/12 truncate text-start font-semibold">
                            {notify.title}
                          </h1>
                          <div className="flex max-h-40 gap-1 text-xs italic text-secondary">
                            <span>Created</span>
                            {formatTimeToNow(new Date(notify.createdAt))}
                          </div>
                        </DialogTrigger>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button
                              onClick={() => {
                                setSelectedNotificationId(notify.id)
                              }}
                              className="group absolute right-1 top-1 h-10 w-10 rounded-full border border-transparent bg-transparent shadow-none hover:bg-transparent"
                            >
                              <MoreVertical className="absolute top-2 mx-auto h-6 w-6 rounded-full text-transparent hover:text-customAccent" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            className="flex flex-col gap-1 overflow-y-auto"
                            align="end"
                          >
                            <Button
                              onClick={() => {
                                setSelectedNotificationId(notify.id)
                                handleDeleteNotification(notify)
                              }}
                              variant="outline"
                              className="flex h-8 w-full border border-transparent bg-transparent text-start shadow-none"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={() => handleReadNotification(notify)}
                              variant="outline"
                              className="flex h-8 w-full border border-transparent bg-transparent text-start shadow-none"
                            >
                              Mark as read
                            </Button>
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
                {formatTimeToNow(new Date(displayedNotification.createdAt!))}
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

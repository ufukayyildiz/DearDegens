"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/src/hooks/use-toast"
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
import { Button } from "@/src/components/components-ui/Button"
import axios from "axios"
import { Trash2, Loader2 } from "lucide-react"

import { Checkbox } from "../components-ui/Checkbox"

export default function MintDelete(listingId: any) {
  const [disabled, setDisabled] = useState<boolean>(true)
  const id = JSON.stringify(listingId.listingId)
  const router = useRouter()

  const { mutate: handleDeleteListing, isPending } = useMutation({
    mutationFn: async (id: any) => {
      await axios.put("/api/deleteListing/", id)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Could not delete listing. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      router.push("/ad/ads-manager")
      router.refresh()
      return toast({
        title: "Success!",
        description: "Listing deleted successfully.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      }
    },
  })

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="group flex h-10 w-10 items-center justify-center hover:text-rose-500 ">
          <Trash2 />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete your listing?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              listing.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
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
                Confirm deletion of listing.
              </label>
            </div>
            <div className="flex flex-row gap-5">
              <Button
                onClick={() => handleDeleteListing(id)}
                disabled={disabled}
                variant="destructive"
                className="flex w-20 text-zinc-100"
              >
                {!isPending ? (
                  <p>Delete</p>
                ) : (
                  <Loader2 className="absolute flex h-5 w-5 animate-spin" />
                )}
              </Button>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

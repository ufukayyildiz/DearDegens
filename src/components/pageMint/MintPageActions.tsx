"use client"

import React, { useState } from "react"
import axios from "axios"
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
import { AlertTriangle, Heart, Trash2, PenTool, PenToolIcon, LucidePenTool, FileEdit} from "lucide-react"
import { useRouter } from "next/navigation"

export default function MintPageActions(listingId: any) {

  const router = useRouter()
  const [, set] = useState<boolean>()
  const handleDeleteListing = async () => {
    try {
      console.log('listingId:', listingId.listingId)
      await axios.put('/api/deleteListing/', listingId.listingId)
      router.push("/p/mymints")
      router.refresh()
      return "Listing has been successfully deleted."
    } catch (error) {
      console.error("Could not delete this listing, status:", error)
    }
  } 

  return (
    <div className="w-full flex justify-end pr-5">
      <div className=" w-4/12 flex justify-between">
        <Button className="my-auto text-primary hover:text-rose-500 bg-transparent border border-transparent shadow-none">
          <Heart />
        </Button>
        <Button className="my-auto hover:text-amber-500 text-primary bg-transparent border border-transparent shadow-none">
          <AlertTriangle />
        </Button>
        <Button className="my-auto hover:text-teal-500 text-primary bg-transparent border border-transparent shadow-none">
          <FileEdit />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="my-auto hover:text-teal-500 text-primary bg-transparent border border-transparent shadow-none">
              <Trash2 />
            </Button>
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
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => handleDeleteListing()}
                disabled
                className="hover:bg-red-300 bg-red-200 text-zinc-800 border border-zinc-400 hover:border-red-500"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

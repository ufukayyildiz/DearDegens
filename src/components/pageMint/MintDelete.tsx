import React, { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Trash2 } from "lucide-react"

import { Checkbox } from "../components-ui/Checkbox"

export default function MintDelete(listingId: any) {
  const [disabled, setDisabled] = useState<boolean>(true)
  const router = useRouter()
  const handleDeleteListing = async () => {
    try {
      console.log("listingId:", listingId.listingId)
      await axios.put("/api/deleteListing/", listingId.listingId)
      router.push("/p/mymints")
      router.refresh()
      return "Listing has been successfully deleted."
    } catch (error) {
      console.error("Could not delete this listing, status:", error)
    }
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="hover:text-teal-500" variant="icon">
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
            <div className="flex w-full justify-between">
              <div className="flex items-center space-x-2 justify-start">
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
              <div>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={() => handleDeleteListing()}
                  disabled={disabled}
                  variant="destructive"
                  className="ml-5"
                >
                  Delete
                </Button>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

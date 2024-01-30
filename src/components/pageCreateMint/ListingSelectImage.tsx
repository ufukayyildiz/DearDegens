import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/components-ui/Dialog"
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
import { ScrollArea } from "../components-ui/ScrollArea"
import { Checkbox } from "../components-ui/Checkbox"
import { Button } from "../components-ui/Button"
import { Image, Trash2 } from "lucide-react"
import { toast } from "@/src/hooks/use-toast"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useGetBucket } from "@/src/components/components-global/services"
import axios from "axios"

interface ListingSelectImageProps {
  onSelectedImages: (selectedImages: string[]) => void
}

export default function ListingSelectImage({
  onSelectedImages,
}: ListingSelectImageProps) {
  const queryClient = new QueryClient()
  const [disabled, setDisabled] = useState<boolean>(true)
  const images = ["1", "2", "3"]

  // USER BUCKET
  const getBucket = useGetBucket()

  const bucket: any = getBucket.data || ""
  const isLoading = getBucket.isLoading
  const isFetching = getBucket.isFetching

  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const toggleImageSelection = (imageName: any) => {
    if (imageName) {
      if (selectedImages.includes(imageName)) {
        setSelectedImages(selectedImages.filter((name) => name !== imageName))
      } else {
        setSelectedImages([...selectedImages, imageName])
      }
    }
  }

  useEffect(() => {
    onSelectedImages(selectedImages)
  }, [selectedImages])

  // MUTATION DELETE IMAGE
  const { mutate: deleteImage } = useMutation({
    mutationFn: async (selectDelete: any) => {
      const { data } = await axios.patch(
        "/api/deleteImageBucket",
        JSON.stringify(selectDelete)
      )
      setDisabled(true)
      return data
    },
    onError: () => {
      setDisabled(true)
      return toast({
        title: "Something went wrong.",
        description:
          "Error deleteing image from your bucket. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        title: "Success!",
        description: "Successfully deleted image from your bucket!",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["getBucket"] })
      }
    },
  })

  return (
    <>
      {/* LISTING IMAGES */}

      <Dialog>
        <DialogTrigger className="mb-3 h-10 w-36 rounded-lg border border-muted text-sm shadow-lg hover:border-customAccent">
          Select Images
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5">
              Select images from your bucket:
            </DialogTitle>
            <div>
              <ScrollArea>
                <div className="flex max-h-[60vh] w-full flex-wrap justify-center gap-5 p-2">
                  {isLoading ||
                    (isFetching === true &&
                      images.map((file: any, index: number) => (
                        <div key={index}>
                          <Image
                            alt={`Image ${index}`}
                            className="h-32 w-32 animate-pulse rounded-md object-contain text-muted"
                          />
                        </div>
                      )))}
                  {bucket &&
                    // bucketString.length > 10 &&
                    bucket[0].map((image: any, index: number) => (
                      <div key={index} className="relative h-32 w-32">
                        <Checkbox
                          checked={selectedImages.includes(image)}
                          onCheckedChange={() => toggleImageSelection(image)}
                          className="absolute right-1 top-1 h-8 w-8 rounded-full"
                        />
                        <AlertDialog>
                          <AlertDialogTrigger
                            asChild
                            className="absolute bottom-1 right-1 h-8 w-8 items-center justify-center rounded-full p-1 hover:bg-muted"
                          >
                            <Trash2 className=" text-rose-500 hover:cursor-pointer" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this image?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your image: {image}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <div className="flex w-full justify-between">
                                <div className="flex items-center justify-start space-x-2">
                                  <Checkbox
                                    id="disable"
                                    checked={!disabled}
                                    onCheckedChange={() =>
                                      setDisabled(!disabled)
                                    }
                                  />
                                  <label
                                    htmlFor="disable"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Confirm image deletion.
                                  </label>
                                </div>
                                <div>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      onClick={() => deleteImage(image)}
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

                        <img
                          src={image}
                          alt={`Image ${index}`}
                          className="h-32 w-32 rounded-md object-cover text-muted"
                        />
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="border-l-1 relative mb-10 flex h-auto min-h-[100px] justify-center rounded-lg border border-dashed border-zinc-300 text-center shadow-lg">
        <div className="flex h-full w-full flex-wrap gap-2 p-2">
          {selectedImages && selectedImages.length! > 0
            ? selectedImages.map((image: any, index: number) => (
                <div key={index}>
                  <Link href={image} target="_blank">
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      className="h-20 w-20 rounded-md object-cover text-muted"
                    />
                  </Link>
                </div>
              ))
            : images.map((file: any, index: number) => (
                <div key={index}>
                  <Image
                    alt={`Image ${index}`}
                    className="h-20 w-20 animate-pulse rounded-md object-contain text-muted"
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  )
}

"use client"

import React, { useCallback, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/src/hooks/use-toast"
import { useUploadThing } from "@/src/hooks/useUploadThing"
import { ScrollArea } from "../components-ui/ScrollArea"
import { categoryHousehold } from "@/src/lib/categories/mintHousehold"
import { southAfrica } from "@/src/lib/locations/southAfrica"
import {
  HouseholdCreationRequest,
  validateHousehold,
} from "@/src/lib/validators/validateHousehold"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useDropzone } from "@uploadthing/react/hooks"
import axios from "axios"
import { Image, Loader, Trash2 } from "lucide-react"
import { FileWithPath } from "react-dropzone"
import { useForm } from "react-hook-form"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { z } from "zod"

import { Button } from "../components-ui/Button"
import { Checkbox } from "../components-ui/Checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components-ui/Form"
import { Input } from "../components-ui/Input"
import { useGetBucket } from "@/src/server/services"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components-ui/Select"
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

import { Textarea } from "../components-ui/Textarea"

type FormData = z.infer<typeof validateHousehold>

export default function MintHousehold() {
  const router = useRouter()
  const images = ["1", "2", "3", "4", "5", "6"]
  const queryClient = new QueryClient()
  const [disabled, setDisabled] = useState<boolean>(true)

  // USER BUCKET
  const getBucket = useGetBucket()
  const bucket: any = getBucket.data
  console.log("bucket:", bucket)

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

  // UPLOADTHING
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    setIsUploading(true)
  }, [])

  // MUTATION CREATE IMAGE BUCKET
  const { mutate: createImageBucket } = useMutation({
    mutationFn: async (fileUrls: any) => {
      const { data } = await axios.patch("/api/createImageBucket", fileUrls)
      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Could not add photos to your image bucket. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: async () => {
      return toast({
        title: "Success!",
        description: "New photos were added to your image bucket.",
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

  // UPLOADTHING UPLOAD LOGIC
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res: any) => {
      const data = res
      const fileUrls = data.map((file: any) => file.fileUrl)
      const urlJson = JSON.stringify(fileUrls)
      createImageBucket(urlJson)
      setIsLoading(false)
      setIsUploading(false)
      return toast({
        title: "Success!",
        description: "Your files have been uploaded successfully.",
      })
    },
    onUploadError: () => {
      setIsUploading(false)
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description: "An error occured while uploading. Please try again.",
        variant: "destructive",
      })
    },
    onUploadBegin: () => {
      setIsUploading(true)
      setIsLoading(true)
      return toast({
        title: "Please wait..",
        description: "Your upload has started.",
      })
    },
  })

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  })

  // REACT-HOOK-FORM
  const form = useForm<FormData>({
    resolver: zodResolver(validateHousehold),
    defaultValues: {
      category: "",
      price: 0,
      title: "",
      brand: "",
      model: "",
      description: "",
      images: "",
      location: "",
      meetup: "",
    },
  })

  // MUTATION LISTING
  const { mutate: createPost } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      category,
      price,
      title,
      brand,
      model,
      description,
      images,
      location,
      meetup,
    }: HouseholdCreationRequest) => {
      const payload: HouseholdCreationRequest = {
        category,
        price,
        title,
        brand,
        model,
        description,
        images,
        location,
        meetup,
      }
      const { data } = await axios.post("/api/createHousehold", payload)

      return data
    },

    // ERROR
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      })
    },

    // SUCCESS
    onSuccess: () => {
      router.push("/p/mymints")
      router.refresh()
      return toast({
        description: "Your post has been published.",
      })
    },
  })

  async function onSubmit(data: FormData) {
    const payload: HouseholdCreationRequest = {
      category: data.category,
      price: data.price,
      title: data.title,
      brand: data.brand,
      model: data.model,
      description: data.description,
      images: JSON.stringify(selectedImages),
      location: data.location,
      meetup: data.meetup,
    }
    createPost(payload)
  }

  return (
    <div className="mx-auto mb-32 mt-10 w-full rounded-lg bg-background p-2">
      {/* UPLOAD IMAGES */}
      <div className="mb-10 flex flex-col items-start justify-start space-y-2">
        <div className="border-l-1 relative flex h-10 w-36 justify-center rounded-lg border border-muted text-center shadow-lg hover:border-customAccent">
          {isLoading === true && (
            <div className="absolute inset-0 z-50 flex h-full w-full justify-center rounded-lg bg-slate-300/30 backdrop-blur-sm">
              <Loader className="my-auto h-8 w-8 animate-spin text-slate-500" />
            </div>
          )}
          <div className="my-auto flex h-auto">
            {isUploading ? (
              <Button onClick={() => startUpload(files)} variant="secondary">
                Upload {files.length} files
              </Button>
            ) : (
              <div {...getRootProps()} className="my-auto h-full text-primary">
                <input {...getInputProps()} />
                <p className="text-sm">Upload to bucket</p>
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          (Max Images: 10 | Max file size: 1mb)
        </p>
      </div>

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
            <DialogDescription>
              <ScrollArea>
                <div className="flex max-h-[60vh] w-full flex-wrap justify-center gap-5 p-2">
                  {bucket && bucket[0].length < 0
                    ? bucket[0].map((image: any, index: number) => (
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
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
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
                            className="h-32 w-32 rounded-md object-contain text-muted"
                          />
                        </div>
                      ))
                    : images.map((file: any, index: number) => (
                        <div key={index}>
                          <Image
                            alt={`Image ${index}`}
                            className="h-32 w-32 animate-pulse rounded-md object-contain text-muted"
                          />
                        </div>
                      ))}
                </div>
              </ScrollArea>
            </DialogDescription>
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
                      className="h-20 w-20 rounded-md object-contain text-muted"
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-row gap-10">
            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 w-full justify-between">
                    <FormLabel className="py-1">Category </FormLabel>
                    <FormLabel className="py-1 text-xs italic text-rose-400">
                      (required)
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {categoryHousehold.map((category, index) => (
                          <div key={index}>
                            <hr className="mb-10"></hr>
                            <p
                              className="text-lg font-bold text-primary"
                              key={category.name}
                            >
                              {category.name}
                            </p>
                            {category.subCategories.map((subs) => (
                              <SelectItem key={subs} value={subs}>
                                {subs}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select an appropriate category..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PRICE */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 w-full justify-between">
                    <FormLabel className="py-1">Price </FormLabel>
                    <FormLabel className="py-1 text-xs italic text-rose-400">
                      (required)
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} type="number" className="w-60" required />
                  </FormControl>
                  <FormDescription>Have a price in mind?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-5 w-full justify-between">
                  <FormLabel className="py-1">Title </FormLabel>
                  <FormLabel className="py-1 text-xs italic text-rose-400">
                    (required)
                  </FormLabel>
                </div>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormDescription>
                  What are we listing for you today?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
            {/* BRAND */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    It&apos;s all about the branding..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MODEL */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Model name/number..</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-5 w-full justify-between">
                  <FormLabel className="py-1">Description </FormLabel>
                  <FormLabel className="py-1 text-xs italic text-rose-400">
                    (required)
                  </FormLabel>
                </div>
                <FormControl>
                  <Textarea {...field} required />
                </FormControl>
                <FormDescription>
                  Good descriptions = Speedy sales!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-10 md:flex-row">
            {/* LOCATION */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 w-full justify-between">
                    <FormLabel className="py-1">Location </FormLabel>
                    <FormLabel className="py-1 text-xs italic text-rose-400">
                      (required)
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {southAfrica.map((category, index) => (
                          <div key={index}>
                            <hr className="mb-10"></hr>
                            <p
                              className="text-lg font-bold text-primary"
                              key={category.name}
                            >
                              {category.name}
                            </p>
                            {category.subCategories.map((subs) => (
                              <SelectItem key={subs} value={subs}>
                                {subs}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Where are you from?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* MEET */}
            <FormField
              control={form.control}
              name="meetup"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 w-full justify-between">
                    <FormLabel className="py-1">Meeting preferance </FormLabel>
                    <FormLabel className="py-1 text-xs italic text-rose-400">
                      (required)
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-auto p-2">
                        <SelectItem key="pub" value="public">
                          Meet in public
                        </SelectItem>
                        <SelectItem key="col" value="collect">
                          Buyer collects
                        </SelectItem>
                        <SelectItem key="del" value="deliver">
                          Deliver to buyer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    How is this deal going down?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-10">
            <Button type="submit" variant="outline">
              Send
            </Button>
            <Button>
              <Link href={`/`}>Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

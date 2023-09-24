"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { OurFileRouter } from "@/src/app/api/uploadthing/core"
import { toast } from "@/src/hooks/use-toast"
import { useUploadThing } from "@/src/hooks/useUploadThing"
import { categoryItems } from "@/src/lib/categories/mintItems"
import { southAfrica } from "@/src/lib/locations/southAfrica"
import { AdCreationRequest, MintValidator } from "@/src/lib/validators/mint"
import { UploadDropzone, type FileWithPath } from "@uploadthing/react"
import { useDropzone } from "@uploadthing/react/hooks"
import { generateClientDropzoneAccept } from "uploadthing/client"

import "@uploadthing/react/styles.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components-ui/Button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components-ui/Select"
import { Textarea } from "../components-ui/Textarea"
import { ImagePlus } from "lucide-react"

type FormData = z.infer<typeof MintValidator>




export default function MintItems() {
  const router = useRouter()

  // UPLOADTHING
  const [files, setFiles] = useState<File[]>([])
  const [uploadData, setuploadData] = useState([])
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
  }, [])
  const fileUrls = uploadData.map((file: any) => file.fileUrl)
  const urlJson = JSON.stringify(fileUrls)
  console.log('urlJson:', urlJson)


  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res: any) => {
      const data = res
      setuploadData(data)
      return toast({
        title: "Success!.",
        description: "Your files have been uploaded successfully.",
      })
    },
    onUploadError: () => {
      return toast({
        title: "Something went wrong.",
        description: "An error occured while uploading. Please try again.",
        variant: "destructive",
      })
    },
    onUploadBegin: () => {
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
    resolver: zodResolver(MintValidator),
    defaultValues: {
      category: "",
      price: 0,
      title: "",
      brand: "",
      model: "",
      description: "",
      images: JSON.stringify(fileUrls),
      location: "",
      meetup: "",
    },
  })

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
    }: AdCreationRequest) => {
      const payload: AdCreationRequest = {
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
      const { data } = await axios.post("/api/createAd", payload)

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
      router.push("/home")
      return toast({
        description: "Your post has been published.",
      })
    },
  })

  async function onSubmit(data: FormData) {
    const payload: AdCreationRequest = {
      category: data.category,
      price: data.price,
      title: data.title,
      brand: data.brand,
      model: data.model,
      description: data.description,
      images: urlJson,
      location: data.location,
      meetup: data.meetup,
    }
    console.log("payload:", payload)
    createPost(payload)
  }

  return (
    <div className="mt-10 mx-auto w-full rounded-lg bg-background p-2">
      {/* IMAGES */}
      <p className="text-sm mb-3">Image Upload</p>
      <div className="flex h-auto min-h-[100px] mb-3 text-center justify-center border border-dashed border-l-1 border-zinc-300 rounded-lg shadow-lg">
        {fileUrls.length > 0 ? (
          <div className="flex flex-wrap w-full h-full gap-2 p-2">
            {fileUrls.map((file: any, index: number) => (
              <div key={index}>
                <img src={file} alt={`Image ${index}`} className="w-20 h-20 rounded-md shadow-md object-contain" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-auto my-auto">
            {files.length > 0 ? (
              <Button onClick={() => startUpload(files)} variant="outline">
                Upload {files.length} files
              </Button>
            ) : (
              <div
                {...getRootProps()}
                className="h-auto my-auto text-zinc-400 italic"
              >
                <input {...getInputProps()} />
                <ImagePlus className="w-10 h-10 animate-pulse"/>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-slate-500 mb-10">(Max Images: 6 | Max file size: 2mb)</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-row gap-10">
            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {categoryItems.map((category, index) => (
                          <div key={index}>
                            <hr className="mb-10"></hr>
                            <p
                              className="font-bold text-lg text-primary"
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
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between gap-10">
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
                    It's all about the branding..
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

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} type="number" className="w-60" />
                </FormControl>
                <FormDescription>Have a price in mind?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  What are we listing for you today?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Good descriptions = Speedy sales!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-10">
            {/* LOCATION */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
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
                              className="font-bold text-lg text-primary"
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
                  <FormLabel>Meeting Preferance</FormLabel>
                  <FormControl>
                    <Select
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

          <Button type="submit" variant="outline">
            Sell!
          </Button>
        </form>
      </Form>
    </div>
  )
}

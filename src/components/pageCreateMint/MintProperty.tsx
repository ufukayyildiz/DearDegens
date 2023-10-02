"use client"

import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/src/hooks/use-toast"
import { useUploadThing } from "@/src/hooks/useUploadThing"
import {
  categoryProperty,
  fascilitiesQty,
  internet,
} from "@/src/lib/categories/mintProperty"
import { southAfrica } from "@/src/lib/locations/southAfrica"
import { cn } from "@/src/lib/utils"
import {
  PropertyCreationRequest,
  validateProperty,
} from "@/src/lib/validators/validateProperty"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
import { useDropzone } from "@uploadthing/react/hooks"
import axios from "axios"
import { addDays, format } from "date-fns"
import { ImagePlus, Loader } from "lucide-react"
import { DateRange } from "react-day-picker"
import { FileWithPath } from "react-dropzone"
import { useForm } from "react-hook-form"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { z } from "zod"

import { Button } from "../components-ui/Button"
import { Calendar } from "../components-ui/Calender"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components-ui/Popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components-ui/Select"
import { Switch } from "../components-ui/Switch"
import { Textarea } from "../components-ui/Textarea"

type FormData = z.infer<typeof validateProperty>

export default function MintProperty() {
  const router = useRouter()

  // DATEPICKER
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  // UPLOADTHING
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [uploadData, setuploadData] = useState([])
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
  }, [])
  const fileUrls = uploadData.map((file: any) => file.fileUrl)
  const urlJson = JSON.stringify(fileUrls)

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res: any) => {
      const data = res
      setuploadData(data)
      setIsLoading(false)
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
    resolver: zodResolver(validateProperty),
    defaultValues: {
      category: "",
      price: 0,
      title: "",
      description: "",
      images: JSON.stringify(fileUrls),
      location: "",
    },
  })

  const { mutate: createPost } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      category,
      price,
      title,
      description,
      bedroom,
      bathroom,
      garage,
      parkingSpace,
      internet,
      petFriendly,
      images,
      location,
      availableStart,
      availableEnd,
    }: PropertyCreationRequest) => {
      const payload: PropertyCreationRequest = {
        category,
        price,
        title,
        description,
        bedroom,
        bathroom,
        garage,
        parkingSpace,
        internet,
        petFriendly,
        images,
        location,
        availableStart,
        availableEnd,
      }
      const { data } = await axios.post("/api/createProperty", payload)

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
    const availabilityStart = new Date(data.availableStart)
    const availabilityEnd = new Date(data.availableEnd)

    const payload: PropertyCreationRequest = {
      category: data.category,
      price: data.price,
      title: data.title,
      description: data.description,
      bedroom: data.bedroom,
      bathroom: data.bathroom,
      garage: data.garage,
      parkingSpace: data.parkingSpace,
      internet: data.internet,
      petFriendly: data.petFriendly,
      images: urlJson,
      location: data.location,
      availableStart: availabilityStart,
      availableEnd: availabilityEnd,
    }
    console.log("Property Payload:", payload)
    createPost(payload)
  }

  return (
    <div className="mt-10 mx-auto w-full rounded-lg bg-background p-2">
      {/* IMAGES */}
      <p className="text-sm mb-3">Image Upload</p>
      <div className="relative flex h-auto min-h-[100px] mb-3 text-center justify-center border border-dashed border-l-1 border-zinc-300 rounded-lg shadow-lg">
        {isLoading === true && (
          <div className="absolute inset-0 flex w-full h-full z-50 top-0 left-0 bg-slate-300/30 justify-center backdrop-blur-sm rounded-lg">
            <Loader className="h-16 w-16 my-auto animate-spin text-slate-500" />
          </div>
        )}
        {fileUrls.length > 0 ? (
          <div className="flex flex-wrap w-full h-full gap-2 p-2">
            {fileUrls.map((file: any, index: number) => (
              <div key={index}>
                <img
                  src={file}
                  alt={`Image ${index}`}
                  className="w-20 h-20 rounded-md shadow-md object-contain"
                />
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
                <ImagePlus className="w-10 h-10 animate-pulse" />
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-10">
        (Max Images: 10 | Max file size: 1mb)
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* CATEGORY */}
          <div className="flex flex-row gap-10">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full h-5 flex justify-between">
                    <FormLabel className="py-1">Category </FormLabel>
                    <FormLabel className="text-xs italic text-rose-400 py-1">
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
                        {categoryProperty.map((category, index) => (
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

            {/* PRICE */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full h-5 flex justify-between">
                    <FormLabel className="py-1">Price </FormLabel>
                    <FormLabel className="text-xs italic text-rose-400 py-1">
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
                <div className="w-full h-5 flex justify-between">
                  <FormLabel className="py-1">Title </FormLabel>
                  <FormLabel className="text-xs italic text-rose-400 py-1">
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

          <div className="flex flex-wrap gap-10">
            {/* BEDS */}
            <FormField
              control={form.control}
              name="bedroom"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full h-5 flex justify-between">
                    <FormLabel className="py-1">Bedrooms </FormLabel>
                    <FormLabel className="text-xs italic text-rose-400 py-1">
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
                        {fascilitiesQty.map((qty, index) => (
                          <SelectItem key={index} value={qty}>
                            {qty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the number of bedrooms..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BATHS */}
            <FormField
              control={form.control}
              name="bathroom"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full h-5 flex justify-between">
                    <FormLabel className="py-1">Bathrooms </FormLabel>
                    <FormLabel className="text-xs italic text-rose-400 py-1">
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
                        {fascilitiesQty.map((qty, index) => (
                          <SelectItem key={index} value={qty}>
                            {qty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the number of bathrooms..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GARAGE */}
            <FormField
              control={form.control}
              name="garage"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full h-5 flex justify-between">
                    <FormLabel className="py-1">Garages </FormLabel>
                    <FormLabel className="text-xs italic text-rose-400 py-1">
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
                        {fascilitiesQty.map((qty, index) => (
                          <SelectItem key={index} value={qty}>
                            {qty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the number of garages..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PARKING */}
            <FormField
              control={form.control}
              name="parkingSpace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parking Spaces</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {fascilitiesQty.map((qty, index) => (
                          <SelectItem key={index} value={qty}>
                            {qty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the number of parking spaces..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* INTERNET */}
            <FormField
              control={form.control}
              name="internet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connectivity</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {internet.map((type, index) => (
                          <SelectItem key={index} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select a connection type..</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="petFriendly"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="px-2 py-1 text-sm">
                    Pet Friendly
                  </FormLabel>
                  <FormControl className="my-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>

                  <FormDescription>
                    Are the furry creatures allowed??
                  </FormDescription>
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
                <div className="w-full h-5 flex justify-between">
                  <FormLabel className="py-1">Description </FormLabel>
                  <FormLabel className="text-xs italic text-rose-400 py-1">
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

          <div className="flex flex-col lg:flex-row gap-10">
            {/* LOCATION */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full h-5 flex justify-between">
                    <FormLabel className="py-1">Location </FormLabel>
                    <FormLabel className="text-xs italic text-rose-400 py-1">
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

            <div className="flex flex-col md:flex-row gap-10">
              {/* AVAILIBILITY START */}
              <FormField
                control={form.control}
                name="availableStart"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="h-5 py-1">
                      Availability{" "}
                      <span className="italic text-xs">(Start)</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Inna dah beninging..</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AVAILIBILITY END */}
              <FormField
                control={form.control}
                name="availableEnd"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="h-5 py-1">
                      Availability <span className="italic text-xs">(End)</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>..is a thing of the past!</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" variant="outline" size="lg">
            Sell!
          </Button>
        </form>
      </Form>
    </div>
  )
}

"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/src/hooks/use-toast"
import { listingCategories } from "@/src/lib/categories/AdCategories"
import { condition } from "@/src/lib/categories/Condition"
import { transmission } from "@/src/lib/categories/Transmission"
import { fuel } from "@/src/lib/categories/Fuel"
import { southAfrica } from "@/src/lib/locations/southAfrica"
import { ListingCreationRequest } from "@/src/lib/validators/validateListingGeneral"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useForm } from "@tanstack/react-form"
import type { FieldApi } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { Loader2, X, PlusCircle } from "lucide-react"
import { nanoid } from "nanoid"
import { Button } from "../components-ui/Button"
import { Checkbox } from "../components-ui/Checkbox"
import { Label } from "../components-ui/Label"
import { FieldDescription } from "../pageCreateMint/FieldDescription"
import { FieldLabel } from "../pageCreateMint/FieldLabel"

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
} from "../components-ui/AlertDialog"
import { AlertCircle } from "lucide-react"
import { Input } from "../components-ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components-ui/Select"

import {
  listingTitle,
  listingBrand,
  listingDescription,
  listingModel,
  listingPrice,
  listingMileage,
  listingYear,
  onChangeAsync,
  onChangeAsyncDebounceMs,
} from "@/src/lib/validators/validateListing"
import { listingItemType, listingsType, userType } from "@/src/types/db"
import { Textarea } from "../components-ui/Textarea"
import ListingSelectImage from "../pageCreateMint/ListingSelectImage"

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em className="absolute top-[105px] text-xs italic text-rose-400">
          {field.state.meta.touchedErrors}
        </em>
      ) : null}
    </>
  )
}

interface EditListingProps {
  listing: listingsType[]
  user: userType
}

export default function EditListing({ listing, user }: EditListingProps) {
  const router = useRouter()

  const items: listingItemType[] =
    listing[0].items && JSON.parse(listing[0].items)
  const [updateItems, setUpdateItems] = useState<Object[]>([
    {
      id: items[0].id,
    },
  ])
  const itemsString = JSON.stringify(items)
  const defaultImages = listing[0].images && JSON.parse(listing[0].images)
  const mintId = listing[0].id

  const [disabled, setDisabled] = useState<boolean>(true)
  const [displayContact, setDisplayContact] = useState<boolean>(false)
  const [isList, setIsList] = useState<boolean>(false)
  const [type, setType] = useState<string>(listing[0].tab!)
  const [category, setCategory] = useState<string>(listing[0].category!)
  const [subCategory, setSubCategory] = useState<string>(
    listing[0].subCategory!
  )

  const mainCategories = listingCategories.filter((item, index) => {
    if (item.type === type) {
      return item.categories.map((sub) => sub)
    }
  })

  const { categories } = mainCategories[0] || [""]

  const subcategories =
    categories &&
    categories.filter((item) => {
      if (item.name === category) {
        return item.subCategories.map((subs) => subs)
      }
    })

  // USER BUCKET
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const callSelectedImages = (data: string[]) => {
    setSelectedImages(data)
  }

  // TANSTACK-HOOK-FORM
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      tab: listing[0].tab || "",
      category: listing[0].category || "",
      subCategory: listing[0].subCategory || "",
      // @ts-ignore
      price: listing[0].price || 0,
      condition: listing[0].condition || "",
      title: listing[0].title || "",
      brand: listing[0].brand || "",
      model: listing[0].model || "",
      mileage: listing[0].mileage || 0,
      year: listing[0].year || 2000,
      transmission: listing[0].transmission || "",
      fuel: listing[0].fuel || "",
      description: listing[0].description || "",
      items: items.map((item: listingItemType) => ({
        id: item.id || nanoid(),
        name: item.name || "",
        price: item.price || 0,
        isSold: item.isSold || false,
      })),
      images: listing[0].images || "",
      location: listing[0].location || "",
      meetup: listing[0].meetup || "",
      displayContact: listing[0].displayContact || false,
    },
    onSubmit: async ({ value }) => {
      const payload: ListingCreationRequest = {
        tab: type,
        category: category,
        subCategory: subCategory,
        price: value.price,
        condition: value.condition,
        title: value.title,
        brand: value.brand,
        model: value.model,
        mileage: value.mileage,
        year: value.year,
        transmission: value.transmission,
        fuel: value.fuel,
        description: value.description,
        items: value.items || [""],
        images: JSON.stringify(selectedImages),
        location: value.location,
        meetup: value.meetup,
        displayContact: displayContact,
      }
      createPost(payload)
      setDisabled(true)
      console.log("Submit Payload:", payload)
    },
  })

  // MUTATION LISTING
  const { mutate: createPost } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      tab,
      category,
      subCategory,
      price,
      condition,
      title,
      brand,
      model,
      mileage,
      year,
      transmission,
      fuel,
      description,
      items,
      images,
      location,
      meetup,
      displayContact,
    }: ListingCreationRequest) => {
      const payload: ListingCreationRequest = {
        tab,
        category,
        subCategory,
        price,
        condition,
        title,
        brand,
        model,
        mileage,
        year,
        transmission,
        fuel,
        description,
        items,
        images,
        location,
        meetup,
        displayContact,
      }
      const { data } = await axios.patch(`/api/editListing/${mintId}`, payload)

      return data
    },

    // ERROR
    onError: (error: AxiosError) => {
      if (error.code === "409") {
        return toast({
          title: "Something went wrong.",
          description: "This listing is too old to update.",
          variant: "destructive",
        })
      }
      if (error.code === "500") {
        return toast({
          title: "Something went wrong.",
          description: "Your post was not updated. Please try again.",
          variant: "destructive",
        })
      }
    },

    // SUCCESS
    onSuccess: () => {
      router.push("/ad/ads-manager")
      router.refresh()
      return toast({
        description: "Your post has been updated.",
      })
    },
  })

  return (
    <div className="mx-auto mb-52 flex min-h-screen w-11/12 flex-col py-10 sm:w-8/12">
      {/* LISTING IMAGES */}
      <ListingSelectImage
        user={user}
        defaultImages={defaultImages}
        onSelectedImages={callSelectedImages}
      />

      <form.Provider>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
          className="space-y-8"
        >
          {/* TYPE */}
          <form.Field name="category">
            {(field) => {
              return (
                <div className="relative w-full flex-col md:w-1/2 md:pr-5">
                  <div className="flex w-full justify-between">
                    <FieldLabel>Ad Type</FieldLabel>
                    <FieldLabel className="py-2 text-xs italic text-rose-400">
                      (required)
                    </FieldLabel>
                  </div>

                  <Select
                    required
                    onValueChange={(event) => setType(event)}
                    defaultValue={listing[0].tab!}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-96 overflow-auto p-2">
                      {listingCategories.map((item, index) => (
                        <div key={index}>
                          <SelectItem
                            className="text-primary"
                            value={item.type}
                            defaultValue={listing[0].tab || ""}
                            key={item.type}
                          >
                            {item.type}
                          </SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Select the type of listing..
                  </FieldDescription>
                </div>
              )
            }}
          </form.Field>

          <div className="flex flex-col gap-10 md:flex-row">
            {/* CATEGORY */}
            <form.Field name="category">
              {(field) => {
                return (
                  <div className="relative w-full flex-col">
                    <div className="flex w-full justify-between">
                      {type === "Vehicles" ? (
                        <FieldLabel>Vehicle Type:</FieldLabel>
                      ) : (
                        <FieldLabel>Category:</FieldLabel>
                      )}
                      <FieldLabel className="py-2 text-xs italic text-rose-400">
                        (required)
                      </FieldLabel>
                    </div>

                    <Select
                      required
                      onValueChange={(event) => setCategory(event)}
                      defaultValue={listing[0].category!}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {categories &&
                          categories.map((item, index) => (
                            <div key={index}>
                              <SelectItem
                                className="text-primary"
                                value={item.name}
                                key={item.name}
                              >
                                {item.name}
                              </SelectItem>
                            </div>
                          ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Select an appropriate type..
                    </FieldDescription>
                  </div>
                )
              }}
            </form.Field>

            {/* SUB-CATEGORY */}
            <form.Field name="subCategory">
              {(field) => {
                return (
                  <div className="relative w-full flex-col">
                    <div className="flex w-full justify-between">
                      {type === "Vehicles" ? (
                        <FieldLabel>Body Type:</FieldLabel>
                      ) : (
                        <FieldLabel>Sub-category:</FieldLabel>
                      )}
                      <FieldLabel className="py-2 text-xs italic text-rose-400">
                        (required)
                      </FieldLabel>
                    </div>

                    <Select
                      required
                      onValueChange={(event) => setSubCategory(event)}
                      defaultValue={listing[0].subCategory!}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {subcategories &&
                          subcategories.map((item, index) => (
                            <div key={index}>
                              <p
                                className="text-lg font-bold text-primary"
                                key={item.name}
                              >
                                {item.name}
                              </p>
                              <hr className="mb-5 mt-2 border border-muted"></hr>
                              {item.subCategories.map((subs) => (
                                <SelectItem key={subs} value={subs}>
                                  {subs}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Select an appropriate body type..
                    </FieldDescription>
                  </div>
                )
              }}
            </form.Field>
          </div>

          <div className="flex flex-col gap-10 md:flex-row">
            {/* PRICE */}
            <form.Field
              name="price"
              validators={{
                onChange: listingPrice,
                onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
                onChangeAsync: onChangeAsync,
              }}
            >
              {(field) => (
                <div className="relative w-full flex-col">
                  <div className="flex w-full  justify-between">
                    <FieldLabel>Price:</FieldLabel>
                    <FieldLabel className="py-2 text-xs italic text-rose-400">
                      (required)
                    </FieldLabel>
                  </div>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      // @ts-ignore
                      field.handleChange(event.target.value)
                    }
                  />

                  <FieldDescription>Have a price in mind?</FieldDescription>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* CONDITION */}
            <form.Field name="condition">
              {(field) => {
                return (
                  <div className="relative w-full flex-col">
                    <div className="flex w-full justify-between">
                      <FieldLabel>Condition:</FieldLabel>
                      <FieldLabel className="py-2 text-xs italic text-rose-400">
                        (required)
                      </FieldLabel>
                    </div>

                    <Select
                      required
                      onValueChange={(event) => field.handleChange(event)}
                      defaultValue={listing[0].condition!}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {condition.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>Be honest now ;)</FieldDescription>
                  </div>
                )
              }}
            </form.Field>
          </div>

          {/* TITLE */}
          <form.Field
            name="title"
            validators={{
              onChange: listingTitle,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => (
              <div className="relative w-full flex-col">
                <div className="flex w-full justify-between">
                  <FieldLabel>Title:</FieldLabel>
                  <FieldLabel className="py-2 text-xs italic text-rose-400">
                    (required)
                  </FieldLabel>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full text-primary"
                  required
                />
                <FieldDescription>
                  What are we listing for you today?
                </FieldDescription>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
            {/* BRAND */}
            <form.Field
              name="brand"
              validators={{
                onChange: listingBrand,
                onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
                onChangeAsync: onChangeAsync,
              }}
            >
              {(field) => (
                <div className="relative w-full flex-col">
                  <div className="flex w-full justify-between">
                    {type === "Vehicles" ? (
                      <FieldLabel>Manufacturer:</FieldLabel>
                    ) : (
                      <FieldLabel>Brand:</FieldLabel>
                    )}
                    <FieldLabel className="py-2 text-xs italic text-rose-400">
                      (required)
                    </FieldLabel>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full text-primary"
                    required
                  />
                  <FieldDescription>
                    It&apos;s all about the branding..
                  </FieldDescription>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* MODEL */}
            <form.Field
              name="model"
              validators={{
                onChange: listingModel,
                onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
                onChangeAsync: onChangeAsync,
              }}
            >
              {(field) => (
                <div className="relative w-full flex-col">
                  <div className="flex w-full justify-between">
                    <FieldLabel>Model:</FieldLabel>
                    <FieldLabel className="py-2 text-xs italic text-rose-400">
                      (required)
                    </FieldLabel>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full text-primary"
                    required
                  />
                  {type === "Vehicles" ? (
                    <FieldDescription>
                      Include vehicle full model name..
                    </FieldDescription>
                  ) : (
                    <FieldDescription>
                      Include products full model name..
                    </FieldDescription>
                  )}
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
          {type === "Vehicles" && (
            <>
              <div className="flex flex-col gap-10 md:flex-row">
                {/* MILEAGE */}
                <form.Field
                  name="mileage"
                  validators={{
                    onChange: listingMileage,
                    onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
                    onChangeAsync: onChangeAsync,
                  }}
                >
                  {(field) => (
                    <div className="relative w-full flex-col">
                      <div className="flex w-full  justify-between">
                        <FieldLabel>Mileage:</FieldLabel>
                        <FieldLabel className="py-2 text-xs italic text-rose-400">
                          (required)
                        </FieldLabel>
                      </div>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          // @ts-ignore
                          field.handleChange(event.target.value)
                        }
                      />

                      <FieldDescription>
                        Its about quality, not quantity!
                      </FieldDescription>
                      <FieldInfo field={field} />
                    </div>
                  )}
                </form.Field>

                {/* YEAR */}
                <form.Field
                  name="year"
                  validators={{
                    onChange: listingYear,
                    onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
                    onChangeAsync: onChangeAsync,
                  }}
                >
                  {(field) => (
                    <div className="relative w-full flex-col">
                      <div className="flex w-full  justify-between">
                        <FieldLabel>Model Year:</FieldLabel>
                        <FieldLabel className="py-2 text-xs italic text-rose-400">
                          (required)
                        </FieldLabel>
                      </div>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          // @ts-ignore
                          field.handleChange(event.target.value)
                        }
                      />

                      <FieldDescription>Manufactured year..</FieldDescription>
                      <FieldInfo field={field} />
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="flex flex-col gap-10 md:flex-row">
                {/* TRANSMISSION */}
                <form.Field name="transmission">
                  {(field) => {
                    return (
                      <div className="relative w-full flex-col">
                        <div className="flex w-full justify-between">
                          <FieldLabel>Transmission:</FieldLabel>
                          <FieldLabel className="py-2 text-xs italic text-rose-400">
                            (required)
                          </FieldLabel>
                        </div>

                        <Select
                          required
                          onValueChange={(event) => field.handleChange(event)}
                          defaultValue={listing[0].transmission!}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-96 overflow-auto p-2">
                            {transmission.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldDescription>One foot or two?</FieldDescription>
                      </div>
                    )
                  }}
                </form.Field>

                {/* FUEL */}
                <form.Field name="fuel">
                  {(field) => {
                    return (
                      <div className="relative w-full flex-col">
                        <div className="flex w-full justify-between">
                          <FieldLabel>Fuel Type:</FieldLabel>
                          <FieldLabel className="py-2 text-xs italic text-rose-400">
                            (required)
                          </FieldLabel>
                        </div>

                        <Select
                          required
                          onValueChange={(event) => field.handleChange(event)}
                          defaultValue={listing[0].fuel!}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-96 overflow-auto p-2">
                            {fuel.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldDescription>Petrol or Diesel?</FieldDescription>
                      </div>
                    )
                  }}
                </form.Field>
              </div>
            </>
          )}

          {/* DESCRIPTION */}
          <form.Field
            name="description"
            validators={{
              onChange: listingDescription,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => (
              <div className="relative w-full flex-col">
                <div className="flex w-full justify-between">
                  <FieldLabel>Type your message here:</FieldLabel>
                  <FieldLabel className="py-2 text-xs italic text-rose-400">
                    (required)
                  </FieldLabel>
                </div>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-32 w-full text-primary"
                  required
                />
                <FieldDescription>
                  Good descriptions = Speedy sales!
                </FieldDescription>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* ITEMS */}
          <hr className="border border-muted" />
          <div className="mb-10 flex items-center justify-start space-x-2">
            <Checkbox
              id="disable"
              checked={isList}
              onCheckedChange={() => setIsList(!isList)}
            />
            {type === "Vehicles" ? (
              <Label
                htmlFor="disable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Any spares sold seperately?
              </Label>
            ) : (
              <Label
                htmlFor="disable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Would you like to list multiple items?
              </Label>
            )}
          </div>
          {isList === true ? (
            <form.Field name="items" mode="array">
              {(itemsField) => (
                <div className="w-full">
                  <FieldLabel>Listed Items:</FieldLabel>
                  <div className="mr-16 flex flex-row">
                    <FieldDescription className="w-full">
                      Name (Max 64 Char.):
                    </FieldDescription>
                    <FieldDescription className="w-full pl-3">
                      Price:
                    </FieldDescription>
                  </div>
                  <div>
                    {!itemsField.state.value.length ? (
                      <FieldDescription className="mb-5">
                        Click the &quot;Plus&quot; icon to start adding items..
                      </FieldDescription>
                    ) : (
                      itemsField.state.value.map(
                        (items: any, index: number) => (
                          <div
                            id={items.id}
                            key={index}
                            className="relative mb-5 flex w-full flex-row space-x-5 pr-16"
                          >
                            <itemsField.Field
                              /* @ts-ignore */
                              index={index}
                              /* @ts-ignore */
                              name="name"
                            >
                              {(field) => {
                                return (
                                  <div className="w-full">
                                    <Input
                                      id={field.name}
                                      name={field.name}
                                      /* @ts-ignore */
                                      value={field.state.value}
                                      onBlur={field.handleBlur}
                                      onChange={(e) =>
                                        field.handleChange(e.target.value)
                                      }
                                      className="w-full text-primary"
                                    />
                                    <FieldInfo field={field} />
                                  </div>
                                )
                              }}
                            </itemsField.Field>

                            <itemsField.Field
                              /* @ts-ignore */
                              index={index}
                              /* @ts-ignore */
                              name="price"
                            >
                              {(field) => {
                                return (
                                  <div className="w-full">
                                    <Input
                                      id={field.name}
                                      name={field.name}
                                      /* @ts-ignore */
                                      value={field.state.value}
                                      onBlur={field.handleBlur}
                                      onChange={(event) =>
                                        // @ts-ignore
                                        field.handleChange(event.target.value)
                                      }
                                      className="w-full text-primary"
                                    />
                                    <FieldInfo field={field} />
                                  </div>
                                )
                              }}
                            </itemsField.Field>
                            <Button
                              variant="icon"
                              onClick={(event) => {
                                event.preventDefault()
                                itemsField.removeValue(index)
                              }}
                              className="absolute bottom-1 right-0 items-center justify-center hover:text-customAccent"
                            >
                              <X className="w-10 text-muted-foreground" />
                            </Button>
                          </div>
                        )
                      )
                    )}
                  </div>
                  <Button
                    variant="icon"
                    onClick={(event) => {
                      event.preventDefault()
                      itemsField.pushValue({
                        id: nanoid(),
                        name: "",
                        price: 0,
                        isSold: false,
                      })
                    }}
                    className="text-muted-foreground hover:text-customAccent"
                  >
                    <PlusCircle />
                  </Button>
                </div>
              )}
            </form.Field>
          ) : (
            <></>
          )}
          <hr className="border border-muted" />

          <div className="flex flex-col gap-10 md:flex-row">
            {/* LOCATION */}
            <form.Field name="location">
              {(field) => {
                return (
                  <div className="relative w-full flex-col">
                    <div className="flex w-full justify-between">
                      <FieldLabel>Location:</FieldLabel>
                      <FieldLabel className="py-2 text-xs italic text-rose-400">
                        (required)
                      </FieldLabel>
                    </div>

                    <Select
                      required
                      onValueChange={(event) => field.handleChange(event)}
                      defaultValue={listing[0].location!}
                    >
                      <SelectTrigger className="w-full">
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
                    <FieldDescription>Where are you from?</FieldDescription>
                  </div>
                )
              }}
            </form.Field>

            {/* MEETUP */}
            <form.Field name="meetup">
              {(field) => {
                return (
                  <div className="relative w-full flex-col">
                    <div className="flex w-full justify-between">
                      <FieldLabel>Meeting preferance:</FieldLabel>
                      <FieldLabel className="py-2 text-xs italic text-rose-400">
                        (required)
                      </FieldLabel>
                    </div>

                    <Select
                      required
                      onValueChange={(event) => field.handleChange(event)}
                      defaultValue={listing[0].meetup!}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
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
                    <FieldDescription>
                      How is this deal going down?
                    </FieldDescription>
                  </div>
                )
              }}
            </form.Field>
          </div>

          <div className="mb-10 flex items-center justify-start space-x-2">
            <Checkbox
              id="disable"
              checked={!disabled}
              onCheckedChange={() => setDisabled(!disabled)}
            />
            <Label
              htmlFor="disable"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read the{" "}
              <Link href="/disclaimer" target="_blank" className="underline">
                disclaimer
              </Link>{" "}
              and{" "}
              <Link
                href="/termsofservice"
                target="_blank"
                className="underline"
              >
                terms of service.
              </Link>
            </Label>
          </div>

          <div className="mb-10 flex items-center justify-start space-x-2">
            <Checkbox
              id="display-contact"
              checked={displayContact}
              onCheckedChange={() => setDisplayContact(!displayContact)}
            />
            <Label
              htmlFor="display-contact"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Display contact number on the ad page?
            </Label>
            <AlertDialog>
              <AlertDialogTrigger>
                <AlertCircle className="text-red-500" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex flex-row items-center justify-start gap-2 text-primary">
                    <AlertCircle /> Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex flex-col text-primary">
                    <span>
                      We advise users not to share their contact details in
                      advertisements before recieving a confirmed offer, as this
                      increases the risk of encountering spam and uninterested
                      buyers.
                    </span>
                    <span className="mt-3 italic text-customAccent">
                      Note: Please ensure your contact details are up to date on
                      your profile page.
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex gap-10">
            <form.Subscribe
              /* @ts-ignore */
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {/* @ts-ignore */}
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant="outline"
                  disabled={disabled || !canSubmit}
                  className="w-20 items-center justify-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Send"
                  )}
                </Button>
              )}
            </form.Subscribe>

            <Button className="w-20">
              <Link href={`/`}>Cancel</Link>
            </Button>
          </div>
        </form>
      </form.Provider>
    </div>
  )
}

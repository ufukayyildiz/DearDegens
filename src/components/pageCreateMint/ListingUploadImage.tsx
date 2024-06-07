import React, { useState, useCallback, useEffect } from "react"
import { useUploadThing } from "@/src/hooks/useUploadThing"
import { useDropzone } from "@uploadthing/react/hooks"
import { FileWithPath } from "react-dropzone"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Button } from "../components-ui/Button"
import { toast } from "@/src/hooks/use-toast"
import { Loader } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { resizeFile } from "@/src/lib/utils"

interface UploadProps {
  bucketLength: number
}

export default function ListingUploadImage({ bucketLength }: UploadProps) {
  const queryClient = useQueryClient()

  const [disabled, setDisabled] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log("acceptedFiles:", acceptedFiles)

    let formattedFiles: any = []

    acceptedFiles.map(async (file) => {
      const image = await resizeFile(file)
      await formattedFiles.push(image)
      await setFiles(formattedFiles)
    })

    setIsUploading(true)
  }, [])

  if (bucketLength >= 50) {
    setDisabled(true)
  }

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
      setFiles([])
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

  return (
    <div className="mb-10 flex flex-col items-start justify-start space-y-2">
      <div
        className={cn(
          "border-l-1 relative flex h-10 w-36 cursor-pointer justify-center rounded-lg border border-muted text-center shadow-lg hover:border-2 hover:border-customAccent",
          disabled && "bg-muted hover:border-muted-foreground"
        )}
      >
        {isLoading === true && (
          <div className="absolute inset-0 z-50 flex h-full w-full justify-center rounded-lg bg-slate-300/30 backdrop-blur-sm">
            <Loader className="my-auto h-8 w-8 animate-spin text-slate-500" />
          </div>
        )}
        <div className="my-auto flex h-auto">
          {isUploading ? (
            <Button onClick={() => startUpload(files)} variant="secondary" className="shadow-none hover:bg-background rounded-none">
              Upload {files.length} files
            </Button>
          ) : (
            <div {...getRootProps()} className="my-auto h-full text-primary">
              <input {...getInputProps()} disabled={disabled} />
              <p className="text-sm">
                {!disabled ? `Upload to bucket` : `Bucket Maxed`}
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {`(Max uploads: 10 | Max file size: 4mb)`}
      </p>
    </div>
  )
}

import { formatTimeToNow } from "@/src/lib/utils"
import { Image } from "lucide-react"
import { MapPin } from "lucide-react"

export default function MiniMintCardComponentSkeleton() {
  return (
    <div className="group mx-auto w-full rounded-lg border border-background bg-background shadow-md transition duration-75 hover:scale-[0.99]">
      <div className="relative flex h-28 justify-between ">
        {/* IMAGE */}
        <div className="h-full w-4/12">
          <div className="flex h-full w-full justify-center rounded-lg bg-muted align-middle">
            <Image
              className="my-auto h-[50%] w-[50%] animate-pulse text-muted-foreground"
              alst="imageLoader"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="relative w-8/12 p-3">
          <div>
            <h1 className="mb-2 max-h-20 truncate text-sm font-bold text-primary"></h1>
          </div>

          {/* <div className="relative mb-5 max-h-16 w-full truncate overflow-hidden text-clip whitespace-pre-line text-xs text-secondary lg:max-h-20">
              <p>{listing.description}</p>
            </div> */}

          <div className="absolute bottom-10 left-3">
            <h1 className="text-base font-semibold text-customAccent"></h1>
          </div>

          <div className="absolute bottom-6 left-3 flex gap-1 text-xs italic text-secondary">
            <MapPin className="h-4 w-4 justify-center text-primary" />
            <span className="text-xs font-bold text-primary"></span>
          </div>

          <div className="absolute bottom-1 left-3 flex gap-1 text-xs italic text-secondary">
            <span>Listed</span>
            {formatTimeToNow(new Date())}
          </div>
        </div>
      </div>
    </div>
  )
}

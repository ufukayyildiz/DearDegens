import Link from "next/link"
import { formatTimeToNow } from "@/src/lib/utils"
import { Image, MapPin } from "lucide-react"

export default function MidiMintCardComponentSkeleton() {
  return (
    <div className="h-60 w-full max-w-[180px] rounded-lg border border-background bg-background shadow-md transition duration-100 hover:scale-[0.99] hover:shadow">
      <div className="relative flex h-full w-full flex-col">
        <div className="w-full">
          {/* IMAGE */}
          <div className="h-28 w-full">
            <div className="flex h-full w-full justify-center rounded-lg bg-muted align-middle">
              <Image
                className="my-auto h-[50%] w-[50%] animate-pulse text-muted-foreground"
                alt="imageLoad"
              />
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="h-full w-full p-2">
          <div>
            <h1 className="mb-2 h-12 overflow-hidden text-sm font-bold text-primary"></h1>
          </div>

          <h1 className="absolute bottom-10 left-2 text-lg font-bold text-customAccent"></h1>

          <div className="absolute bottom-6 left-2 flex gap-1 text-xs italic text-secondary">
            <MapPin className="h-4 w-4 justify-center text-primary" />
            <span className="text-xs font-bold text-primary"></span>
          </div>

          <div className="absolute bottom-1 left-2 flex gap-1 text-xs italic text-secondary">
            <span>Listed</span>
            {formatTimeToNow(new Date())}
          </div>
        </div>
      </div>
    </div>
  )
}

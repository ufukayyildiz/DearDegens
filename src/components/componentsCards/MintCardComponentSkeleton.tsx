import Link from "next/link"
import { Image } from "lucide-react"
import { formatTimeToNow } from "@/src/lib/utils"

export default function MintCardComponentSkeleton() {
  return (
    <div className="group mx-auto w-full rounded-lg border border-l-4 border-background bg-background shadow-md transition duration-75 hover:scale-[0.99]">
      <div className="relative flex h-52 justify-between ">
        {/* INFO */}
        <div className="relative w-8/12 p-3">
          <div>
            <h1 className="mb-2 text-xl font-bold text-primary"></h1>
          </div>

          <div className="relative mb-5 h-16 w-full overflow-hidden text-clip whitespace-pre-line text-xs text-secondary lg:max-h-20"></div>

          <div className="absolute bottom-6">
            <h1 className="text-lg font-semibold text-customAccent"></h1>
            <p className="text-xs italic text-secondary">
              <span className="font-bold text-primary">Category:</span>{" "}
            </p>
          </div>

          <div className="absolute bottom-2 left-3 flex max-h-40 gap-1 text-xs italic text-secondary">
            <span>Listed</span>
            {formatTimeToNow(new Date())}
            <span>in</span>
            <span className="font-bold text-primary"></span>
          </div>
        </div>

        {/* IMAGE */}
        <div className="h-full w-4/12">
          <div className="flex h-full w-full justify-center rounded-lg bg-muted align-middle">
            <Image
              className="my-auto h-[50%] w-[50%] animate-pulse text-muted-foreground"
              alst="imageLoader"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

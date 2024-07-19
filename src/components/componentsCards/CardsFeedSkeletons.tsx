"use client"
import MiniMintCardComponentSkeleton from "./MiniMintCardComponentSkeleton"
import MidiMintCardComponentSkeleton from "./MidiMintCardComponentSkeleton"
import MintCardComponentSkeleton from "./MintCardComponentSkeleton"
import useMediaQuery from "@/src/hooks/useMediaQuery"

export default function CardsFeedSkeleton() {
  const mock = ["1", "2", "3", "4", "5"]
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)")
  const isAboveSmallScreens = useMediaQuery("(min-width: 465px)")
  return isAboveMediumScreens ? (
    <div className="flex flex-col justify-center gap-5 px-5 py-5">
      {mock.map(() => (
        <MintCardComponentSkeleton />
      ))}
    </div>
  ) : isAboveSmallScreens ? (
    <div className="mb-32 flex flex-wrap justify-center gap-5 px-5 py-5">
      {mock.map(() => (
        <MidiMintCardComponentSkeleton />
      ))}
    </div>
  ) : (
    <div className="flex flex-col justify-center gap-5 px-5 py-5">
      {mock.map(() => (
        <MiniMintCardComponentSkeleton />
      ))}
    </div>
  )
}

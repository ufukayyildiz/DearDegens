import React from "react"
import { CalendarMinus, CalendarPlus } from "lucide-react"
import { FaSortAmountDown } from "react-icons/fa"
import { FaSortAmountDownAlt } from "react-icons/fa";

interface SortIconProps {
  state: string
}

export default function SortIcon({ state }: SortIconProps) {
  if (state === "latest") {
    return <CalendarPlus />
  }

  if (state === "oldest") {
    return <CalendarMinus />
  }

  if (state === "high") {
    return <FaSortAmountDown />
  }

  if (state === "low") {
    return <FaSortAmountDownAlt />
  }
}

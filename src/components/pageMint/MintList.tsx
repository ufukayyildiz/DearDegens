import React from "react"
import { Gavel } from "lucide-react"
import { Button } from "../components-ui/Button"

export default function MintList(items: any) {
  const props = items
  const list = JSON.parse(props.items)
  const listString = JSON.stringify(list)

  // PRICE TEXT FORMATTER
  const formatPrice = (price: any) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
    })

    return formatter.format(price)
  }

  if (listString.length > 65) {
    return (
      <div className="my-5 w-full">
        <hr className="my-2 border border-t-muted-foreground" />
        <h1 className=" mb-2 text-lg font-bold">Listed Items:</h1>
        {list &&
          list.map((item: any, index: any) => {
            return (
              <div className="pl-2">
                <hr className="border border-dotted border-muted" />
                <div
                  key={item.id}
                  className="flex  w-full flex-row items-center justify-between"
                >
                  <p>{item.name}</p>
                  <div className="flex items-center space-x-5">
                    <p className="font-semibold text-customAccent">
                      R {formatPrice(item.price)}
                    </p>
                    <Button variant="icon" className="hover:text-customAccent">
                      <Gavel />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    )
  } else {
    return <></>
  }
}

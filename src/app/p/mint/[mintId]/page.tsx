import React from 'react'
import { db } from '@/src/db'
import { eq } from 'drizzle-orm'
import { listingsGeneral, listingsProperty } from '@/src/db/schema'
import MintCarousel from '@/src/components/pageMint/MintCarousel'
import { formatTimeToNow } from '@/src/lib/utils'
import { Button } from '@/src/components/components-ui/Button'

interface MintPageProps {
  params: {
    mintId: string
  }
}

export default async function MintPage({ params }: MintPageProps) {

  const param = params
  const decodedParam = decodeURIComponent(param.mintId)

  const listingProperty = await db.select().from(listingsProperty).where(eq(listingsProperty.id, decodedParam))
  const listingGeneral = await db.select().from(listingsGeneral).where(eq(listingsGeneral.id, decodedParam))

  const mint = [...listingProperty, ...listingGeneral]

  return (
    <div className='flex w-full h-auto'>
      <div className='w-11/12 md:w-8/12 mx-auto'>
        {mint.map((item, index) => (
          <div key={index} >
            <MintCarousel listing={item.images}/>
            <div className='flex flex-row justify-between mt-10'>
              <div className='my-auto'>
                <h1 className='text-xl font-bold'>{item.title}</h1>
                <p className='text-xs italic text-secondary'>Listed {formatTimeToNow(new Date(item.createdAt))}</p>
              </div>
              <Button variant="outline" className='font-bold my-auto border-2 border-teal-500'>Make an Offer</Button>
            </div>
            <hr className="my-2 border border-t-muted-foreground" />
            <p className='mt-10'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

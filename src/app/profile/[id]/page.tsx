'use client'
import React from 'react'

function page({params}) {
    console.log()
  return (
    <div>
       {params.id}
    </div>
  )
}

export default page

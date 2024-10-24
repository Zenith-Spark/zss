import { usrDBSidebar } from '@assets/app/components/resuables/index'
import React from 'react'
import { PiGreaterThan } from 'react-icons/pi'

const page = () => {
  return (
    <div>
         <p className="flex flex-row gap-2 items-center text-xs pb-4 font-thin px-6 pt-4">
              <span>{usrDBSidebar[5].icons}</span>
              <span><PiGreaterThan /></span>
              <span>{usrDBSidebar[5].name}</span>
            </p>
    </div>
  )
}

export default page
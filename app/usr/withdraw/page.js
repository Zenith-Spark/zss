import React from 'react'
import CryptoPricesTable from '../CryptoPricesDashboard/CryptoPricesTable'
import { PiGreaterThan } from 'react-icons/pi'
import { usrDBSidebar } from '@assets/app/components/resuables/index'


const page = () => {
  return (
    <div>
       <p className="flex flex-row gap-2 items-center text-xs pb-4 font-thin px-6 pt-4">
              <span>{usrDBSidebar[1].icons}</span>
              <span><PiGreaterThan /></span>
              <span>{usrDBSidebar[1].name}</span>
            </p>
        <CryptoPricesTable/>
    </div>
  )
}

export default page
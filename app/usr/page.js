// app/dashboard/page.js
import React from 'react';
import DashboardLayout from './DashboardLayout';
import { ButtonOne, ButtonTwo } from '../components/resuables/Buttons/Buttons';
import { usrDBSidebar } from '../components/resuables/index';
import CryptoPricesDashboard from './CryptoPricesDashboard/CryptoPricesDashboard';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="w-full md:w-[70%] xl:w-[80%] transition  duration-1000 h-auto pt-24 md:ml-[30%] xl:ml-[20%] md:pl-5 xl:pl-8">
        <div className="flex flex-col sm:flex-row items-start md:items-center justify-between md:mx-5 md:w-[80%] mx-auto  gap-6 ">
          {/* Total Balance Section */}
          <div className=' px-6'>
            <h3 className="text-base md:text-lg tracking-wider font-medium ">Total Balance</h3>
            <h1 className="text-6xl md:text-8xl font-bold tracking-wide ">
              0.00 $
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-4 mt-4 md:mt-0  px-6">
            <ButtonTwo buttonValue="Buy" iconValue={usrDBSidebar[1].icons} />
            <ButtonOne buttonValue="Withdraw" iconValue={usrDBSidebar[2].icons} />
          </div>
        </div>
        <div>
          <CryptoPricesDashboard/>
        </div>
      </div>
    </DashboardLayout>
  );
}

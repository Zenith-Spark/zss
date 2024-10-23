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
        <div>
          <CryptoPricesDashboard/>
        </div>
      </div>
    </DashboardLayout>
  );
}

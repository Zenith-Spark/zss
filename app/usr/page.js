// app/dashboard/page.js
'use client'
import React from 'react';
import TotalBalance from '../components/resuables/totalBaance/TotalBalance';
import CryptoPricesTable from './CryptoPricesDashboard/CryptoPricesTable';



export default function DashboardPage() {
  return (
      <div className='container mx-auto pb-5 pt-16'>
         <div className="">
      <TotalBalance/>
      <div>
        <CryptoPricesTable showTable={true}/>
      </div>
    </div>
      </div>
  );
}

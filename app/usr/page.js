// app/dashboard/page.js
'use client';
import React, { useEffect } from 'react';
import TotalBalance from '../components/resuables/totalBaance/TotalBalance';
import CryptoPricesTable from './CryptoPricesDashboard/CryptoPricesTable';
import { useGlobalState } from '../GlobalStateProvider';

export default function DashboardPage() {
  const { fetchTotalBalance, fetchData} = useGlobalState();

  useEffect(() => {
    // Get the auth token from local or session storage
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (authToken) {
      // Call fetchTotalBalance if authToken exists
      fetchTotalBalance(authToken);
      fetchData(authToken)

    }
  }, [fetchTotalBalance, fetchData]); // Empty dependency array ensures it only runs on mount

  return (
    <div className='container mx-auto pb-5 pt-16'>
      <div>
        <TotalBalance />
        <div>
          <CryptoPricesTable showTable={true} />
        </div>
      </div>
    </div>
  );
}

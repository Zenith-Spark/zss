'use client';
import React from 'react';
import dynamic from 'next/dynamic';

// Lazy load components
const TotalBalance = dynamic(() => import('../../components/resuables/totalBaance/TotalBalance'), {
  loading: () => <p>Loading Total Balance...</p>, // Optional loading fallback
});

const CryptoPricesTable = dynamic(() => import('./CryptoPricesTable'), {
  loading: () => <p>Loading Prices Table...</p>, // Optional loading fallback
});

const CryptoPricesDashboard = () => {
  return (
    <div>
      <TotalBalance />
      <div>
        <CryptoPricesTable />
      </div>
    </div>
  );
};

export default CryptoPricesDashboard;

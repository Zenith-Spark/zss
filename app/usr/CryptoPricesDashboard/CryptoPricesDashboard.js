'use client';
import React from 'react';
import TotalBalance from '../../components/resuables/totalBaance/TotalBalance';
import CryptoPricesTable from './CryptoPricesTable';


const CryptoPricesDashboard = () => {
  return (
    <div className="">
      <TotalBalance/>
      <div>
        <CryptoPricesTable/>
      </div>
    </div>
  );
};

export default CryptoPricesDashboard;

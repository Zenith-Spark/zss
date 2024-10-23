// app/dashboard/page.js
import React from 'react';
import DashboardLayout from './layout';
import CryptoPricesDashboard from './CryptoPricesDashboard/CryptoPricesDashboard';

export default function DashboardPage() {
  return (
      <div>
        <div>
          <CryptoPricesDashboard/>
        </div>
      </div>
  );
}

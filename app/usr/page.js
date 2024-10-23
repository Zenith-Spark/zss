// app/dashboard/page.js
import React from 'react';
import DashboardLayout from './layout';
import { ButtonOne, ButtonTwo } from '../components/resuables/Buttons/Buttons';
import { usrDBSidebar } from '../components/resuables/index';
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

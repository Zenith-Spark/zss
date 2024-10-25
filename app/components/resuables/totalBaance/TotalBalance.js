import React from 'react';
import { DBButtonOne, DBButtonTwo } from '@assets/app/components/resuables/Buttons/Buttons';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { PiGreaterThan } from 'react-icons/pi'; // Assuming you need this import for the icon
import Link from 'next/link';

const TotalBalance = () => {
  const { formData } = useGlobalState();

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row items-center gap-y-3">
        <div className="flex flex-col sm:flex-row items-start justify-between md:items-center md:mx-5 md:w-[80%] gap-6">
          {/* Total Balance Section */}
          <div className="px-5">
            <p className="flex flex-row gap-2 items-center text-xs pb-4 font-thin">
              <span>{usrDBSidebar[0].icons}</span>
              <span><PiGreaterThan /></span>
              <span>{usrDBSidebar[0].name}</span>
            </p>
            <h3 className="text-base md:text-lg tracking-wider font-medium">Total Balance</h3>
            <h1 className="text-4xl md:text-6xl font-bold tracking-wide md:mx-0">
              ${formData.totalBalance.toFixed(2)}
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4 md:mt-10 px-6">
            <DBButtonTwo buttonValue="Buy" iconValue={usrDBSidebar[1].icons} />
            <Link href={'/usr/withdraw'}>
            <DBButtonOne buttonValue="Withdraw" iconValue={usrDBSidebar[2].icons} />
            </Link>
            <Link href={'/usr/deposit'}>
            <DBButtonOne buttonValue="Deposit" iconValue={usrDBSidebar[2].icons} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;

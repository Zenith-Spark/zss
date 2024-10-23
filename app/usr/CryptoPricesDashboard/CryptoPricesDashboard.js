'use client';
import React, { useState, useEffect } from 'react';
import useCryptoPrices from '@assets/app/components/resuables/CryptoPrices/CryptoPrices';
import { ButtonOne, ButtonTwo, DBButtonOne, DBButtonTwo } from '@assets/app/components/resuables/Buttons/Buttons';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import Loader from '@assets/app/components/resuables/Loader/Loader';

const CryptoPricesDashboard = () => {
  const userWallet = {
    bitcoin: 1.5,
    ethereum: 10,
    cardano: 5000,
    // Add more coins as needed
  };

  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOwnedCoins, setShowOwnedCoins] = useState(true); // Set to true to show owned coins first
  const { coinsData, loading, error, totalCoins } = useCryptoPrices(currency, page);

  const pageLimit = 20; // Pagination limit (20 coins per page)

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter coins based on the search query
  let filteredCoins = coinsData.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter to only show owned coins if toggled on
  if (showOwnedCoins) {
    filteredCoins = filteredCoins.filter((coin) => userWallet[coin.id]);
  }

  // Calculate total balance (sum of all owned coins' worth)
  const totalBalance = filteredCoins.reduce((acc, coin) => {
    const userCoinAmount = userWallet[coin.id] || 0;
    return acc + userCoinAmount * coin.currentPrice;
  }, 0);

  // Pagination logic: Slice the coins array based on the page and limit
  const paginatedCoins = filteredCoins.slice((page - 1) * pageLimit, page * pageLimit);

  if (loading) return <p className="text-center">
    <Loader/>
  </p>;
  if (error) return <p className="text-center text-red-500">Error fetching data: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex flex-col md:flex-row items-center gap-y-3">
        <div className="flex flex-col sm:flex-row items-start justify-between md:items-center md:mx-5 md:w-[80%] gap-6">
          {/* Total Balance Section */}
          <div className="">
            <h3 className="text-base md:text-lg tracking-wider font-medium">Total Balance</h3>
            <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
              {totalBalance.toFixed(2)} $
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0 px-6">
            <DBButtonTwo buttonValue="Buy" iconValue={usrDBSidebar[1].icons} />
            <DBButtonOne buttonValue="Withdraw" iconValue={usrDBSidebar[2].icons} />
            <DBButtonOne buttonValue="Deposit" iconValue={usrDBSidebar[2].icons} />
          </div>
        </div>
      </div>

      {/* Search Input Section */}
      <div className="pt-16 flex justify-between items-center px-5">
        <input
          type="text"
          placeholder="Search for coins..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-md w-1/2 md:w-1/4"
        />
      </div>

      {/* Toggle Button to Switch Between All Coins and Owned Coins */}
      <div className="mb-4 text-center w-full">
        <div className="flex justify-center gap-4">
        <button
            onClick={() => setShowOwnedCoins(true)}
            className={`p-2 ${showOwnedCoins ? 'border-b-2 border-blue-500' : ''} w-1/2`}
          >
            Coins Owned
          </button>
          <button
            onClick={() => setShowOwnedCoins(false)}
            className={`p-2 ${!showOwnedCoins ? 'border-b-2 border-blue-500' : ''} w-1/2`}
          >
            Current Rate
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="">
              <th className="text-left px-6">Coins</th>
              {showOwnedCoins && <th className="text-right px-6">Owned</th>}
              {showOwnedCoins && <th className="text-right px-6">Worth (USD)</th>}
              {!showOwnedCoins && <th className="text-right px-6">Rate</th>}
              {!showOwnedCoins && <th className="text-right px-6 hidden md:table-cell">Price Change</th>}
            </tr>
          </thead>

          <tbody className="text-xs md:text-base">
            {paginatedCoins.map((coin) => {
              const userCoinAmount = userWallet[coin.id] || 0;
              const userTotalValue = userCoinAmount * coin.currentPrice;
              const coinSymbol = coin.symbol ? coin.symbol.toUpperCase() : ''; // Ensure symbol exists

              return (
                <tr key={coin.id} className="transition duration-200 ease-in-out">
                  <td className="flex items-center py-4 px-6">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-4 rounded-full" />
                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      {!showOwnedCoins && <p className="text-sm">${coin.currentPrice.toFixed(2)}</p>}
                    </div>
                  </td>
                  {showOwnedCoins && (
                    <>
                      <td className="py-4 px-6 text-right">
                        {userCoinAmount.toFixed(2)} {coinSymbol}
                      </td>
                      <td className="py-4 px-6 text-right">
                        ${userTotalValue.toFixed(2)}
                      </td>
                    </>
                  )}
                  {!showOwnedCoins && (
                    <>
                      <td className="py-4 px-6 text-right">${coin.currentPrice.toFixed(2)}</td>
                      <td
                        className={`py-4 px-6 text-right hidden md:table-cell ${
                          coin.priceChange < 0 ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        {coin.priceChange.toFixed(2)}%
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Show message if no coins are owned when showing owned coins */}
        {showOwnedCoins && paginatedCoins.length === 0 && (
          <p className="text-center py-4">You dont own any coins yet.</p>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-x-5 items-center">
        {/* Pagination logic: Only show pagination buttons if there are more than 20 owned coins */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={
            showOwnedCoins
              ? page * pageLimit >= filteredCoins.length // In "Owned Coins" mode, check if there are more than 20 owned coins
              : page * pageLimit >= totalCoins // In "All Coins" mode, check if there are more than 20 coins in total
          }
          className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoPricesDashboard;

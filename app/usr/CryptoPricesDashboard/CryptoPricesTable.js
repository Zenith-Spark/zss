'use client';
import React, { useState } from 'react';
import useCryptoPrices from '@assets/app/components/resuables/CryptoPrices/CryptoPrices';
import { DBButtonOne, DBButtonTwo } from '@assets/app/components/resuables/Buttons/Buttons';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import Loader from '@assets/app/components/resuables/Loader/Loader';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { PiGreaterThan } from "react-icons/pi";


const CryptoPricesTable = () => {
  // Get user wallet from global state
  const { formData } = useGlobalState(); // Use your global state hook
  const userWallet = formData.userWallet; // Adjust the path to match your state structure

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

  return (
    <div className="container mx-auto pb-5">
      {/* Search Input Section */}
      <div className="pt-16 mb-5 flex justify-between items-center px-5">
        <input
          type="text"
          placeholder="Search for coins..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-md w-full md:w-1/2"
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

      <div className="overflow-hidden">
        {/* Loader and Error Handling within the Table Section */}
        {loading ? (
          <p className="text-center  translate-x-3 md:translate-x-16">
            <Loader />
          </p>
        ) : error ? (
          <p className="text-center text-red-500">Error fetching data: {error.message}</p>
        ) : (
          <>
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
              <p className="text-center py-16 text-lg font-bold">You dont own any coins yet.</p>
            )}
          </>
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

        <span>{page}</span>

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

export default CryptoPricesTable;

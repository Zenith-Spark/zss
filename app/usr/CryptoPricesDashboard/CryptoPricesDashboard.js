'use client';
import React, { useState, useEffect } from 'react';
import useCryptoPrices from '@assets/app/components/resuables/CryptoPrices/CryptoPrices';

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
  const [sortByCoins, setSortByCoins] = useState(false); // State to control sorting by coins
  const { coinsData, loading, error, totalCoins } = useCryptoPrices(currency, page);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortToggle = () => {
    setSortByCoins((prev) => !prev); // Toggle sorting
  };

  // Filter coins based on the search query
  let filteredCoins = coinsData.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort coins by the number of coins owned
  if (sortByCoins) {
    filteredCoins = filteredCoins.sort((a, b) => (userWallet[b.id] || 0) - (userWallet[a.id] || 0));
  }

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching data: {error.message}</p>;

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex justify-around flex-col md:flex-row gap-y-3 px-5">
        <div>
          <input
            type="text"
            placeholder="Search coin..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none text-slate-800"
          />
        </div>

        <button
          onClick={handleSortToggle}
          className="p-2 bg-blue-500 text-white rounded-md focus:outline-none"
        >
          {sortByCoins ? 'Sort by Price' : 'Sort by Coins Owned'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <tbody className="text-sm">
            {filteredCoins.map((coin) => {
              const userCoinAmount = userWallet[coin.id] || 0;
              const userTotalValue = userCoinAmount * coin.currentPrice;

              return (
                <tr key={coin.id} className="transition duration-200 ease-in-out">
                  <td className="flex items-center py-4 px-6">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-4 rounded-full" />
                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-sm">${coin.currentPrice.toFixed(2)}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {userCoinAmount.toFixed(4)} {coin.symbol ? coin.symbol.toUpperCase() : ''}
                  </td>
                  <td className="py-4 px-6 text-right">${userTotalValue.toFixed(2)}</td>
                  <td
                    className={`py-4 px-6 text-right hidden md:table-cell ${
                      coin.priceChange < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {coin.priceChange.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center gap-x-5 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * 100 >= totalCoins}
          className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoPricesDashboard;

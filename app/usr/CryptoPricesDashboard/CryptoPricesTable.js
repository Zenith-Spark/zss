'use client';
import React, { useEffect, useState } from 'react';
import useCryptoPrices from '@assets/app/components/resuables/CryptoPrices/CryptoPrices';
import { DBButtonOne, DBButtonTwo } from '@assets/app/components/resuables/Buttons/Buttons';
import Loader from '@assets/app/components/resuables/Loader/Loader';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { X } from 'lucide-react';
import Txn from '../transaction/Txn';

const CryptoPricesTable = () => {
  const { formData } = useGlobalState();
  const userWallet = formData.userWallet;

  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOwnedCoins, setShowOwnedCoins] = useState(true);
  const { coinsData, loading, error, totalCoins } = useCryptoPrices(currency, page);

  const pageLimit = 20;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered coins based on search and ownership
  let filteredCoins = coinsData.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showOwnedCoins) {
    filteredCoins = filteredCoins.filter((coin) => userWallet[coin.id]);
  }

  const totalBalance = filteredCoins.reduce((acc, coin) => {
    const userCoinAmount = userWallet[coin.id] || 0;
    return acc + userCoinAmount * coin.currentPrice;
  }, 0);

  const totalFilteredCoins = filteredCoins.length;

  // Handle pagination of filtered coins
  const paginatedCoins = filteredCoins.slice((page - 1) * pageLimit, page * pageLimit);

  const [transaction, setTransaction] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const toggleTransaction = (coin) => {
    setSelectedCoin(coin);
    setTransaction((prev) => !prev);
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (transaction) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [transaction]);

  // Reset page to 1 when search query or showOwnedCoins state changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, showOwnedCoins]);

  return (
    <div className="container mx-auto pb-5 pt-5">
      {/* Full-screen overlay for transaction popup */}
      <div className={`w-full ${!transaction ? 'h-0' : 'h-screen'} overflow-hidden bg-black bg-opacity-60 fixed left-0 top-0 z-50`}>
        <div className='flex flex-col bg-white text-slate-800 rounded-lg shadow-lg m-auto w-[90%] md:w-[60%] p-5 h-full relative'>
        <button onClick={() => toggleTransaction(null)} className="mt-2 text-slate-800 rounded-full cursor-pointer absolute right-3 top-0">
                  <X />
                </button>
          <div className='flex flex-wrap justify-around '>
          <section className='flex flex-row items-center justify-between'>
            {selectedCoin && (
              <div className="flex flex-row items-center gap-x-5">
                <img src={selectedCoin.image} alt={selectedCoin.name} className="w-20 h-20 rounded-full" />
                <div>
                  <h2 className="text-xl font-bold">{selectedCoin.name}</h2>
                  <p className="md:text-lg font-semibold">~{userWallet[selectedCoin.id]?.toFixed(2) || 0}</p>
                  <p className="md:text-lg font-semibold">
                    ~ ${(userWallet[selectedCoin.id] ? (userWallet[selectedCoin.id] * selectedCoin.currentPrice).toFixed(2) : 0)}
                  </p>
                </div>
              </div>
            )}
          </section>
          <div className='flex flex-wrap items-center justify-start gap-x-3 my-4'>
            <DBButtonOne buttonValue={'Deposit'} />
            <DBButtonTwo buttonValue={'Withdraw'} />
          </div>
            </div>
          <Txn />
        </div>
      </div>

      <div className="mb-5 flex justify-between items-center px-5">
        <input
          type="text"
          placeholder="Search for coins..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-md w-full md:w-1/2"
        />
      </div>

      {/* Buttons for toggling owned coins and current rate */}
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

      {/* Table for displaying coins */}
      <div className="overflow-hidden">
        {loading ? (
          <p className="text-center translate-x-3 md:translate-x-16">
            <Loader />
          </p>
        ) : error ? (
          <p className="text-center text-red-500">Error fetching data: {error.message}</p>
        ) : (
          <>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
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
                  const coinSymbol = coin.symbol ? coin.symbol.toUpperCase() : '';

                  return (
                    <tr key={coin.id} className="transition duration-200 ease-in-out hover:border-b">
                      <td className="flex items-center py-4 px-6" onClick={() => toggleTransaction(coin)}>
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
                          <td className={`py-4 px-6 text-right hidden md:table-cell ${coin.priceChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {coin.priceChange.toFixed(2)}%
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {showOwnedCoins && paginatedCoins.length === 0 && (
              <p className="text-center py-4 text-sm md:text-base">You do not own any coins yet.</p>
            )}

            <div className="mt-5 flex justify-center space-x-4">
              {/* Pagination buttons */}
              <button
                onClick={() => setPage(page > 1 ? page - 1 : page)}
                disabled={page === 1}
                className={`p-2 px-4 rounded-md ${page === 1 ? '' : 'bg-blue-500 text-white'}`}
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page * pageLimit >= totalFilteredCoins}
                className={`p-2 px-4 rounded-md ${page * pageLimit >= totalFilteredCoins ? '' : 'bg-blue-500 text-white'}`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoPricesTable;

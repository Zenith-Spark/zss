'use client';
import React, { useEffect, useState } from 'react';
import useCryptoPrices from '@assets/app/components/resuables/CryptoPrices/CryptoPrices';
import { ButtonOne, DBButtonOne, DBButtonTwo } from '@assets/app/components/resuables/Buttons/Buttons';
import Loader from '@assets/app/components/resuables/Loader/Loader';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { X } from 'lucide-react';
import Txn from '../transaction/Txn';
import Modal from '@assets/app/components/resuables/Modal/Modal';

const CryptoPricesTable = ({showTable}) => {
  const { formData, setFormData } = useGlobalState();
  const userWallet = formData.userWallet;

  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOwnedCoins, setShowOwnedCoins] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const { coinsData, loading, error, refetch } = useCryptoPrices(currency, page);

  const pageLimit = 10; // Display 10 coins per page

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered coins based on search and ownership
  let filteredCoins = coinsData.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showOwnedCoins) {
    // Filter to show only the coins owned by the user
    filteredCoins = filteredCoins.filter(
      (coin) => userWallet[coin.id] && userWallet[coin.id] > 0
    );
  }

  // Deduplicate coins based on their unique `id`
  const uniqueCoins = filteredCoins.reduce((acc, coin) => {
    if (!acc.some((item) => item.id === coin.id)) {
      acc.push(coin);
    }
    return acc;
  }, []);

  // Calculate total balance based on user wallet
  const totalBalance = uniqueCoins.reduce((acc, coin) => {
    const userCoinAmount = userWallet[coin.id] || 0;
    return acc + userCoinAmount * coin.currentPrice;
  }, 0);

  // Update global state with the new total balance
  useEffect(() => {
    setFormData((prev) => ({ ...prev, totalBalance }));
  }, [totalBalance, setFormData]);

  const totalUniqueCoins = uniqueCoins.length;

  // Handle pagination of filtered coins
  const paginatedCoins = uniqueCoins.slice((page - 1) * pageLimit, page * pageLimit);

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

  const handleOutsideClick = (e) => {
    if (transaction && e.target === e.currentTarget) {
      setTransaction(false); // Close the modal when clicking outside
    }
  };

  const handleShowDeposit = () => {
    setShowDeposit(!showDeposit); 
  }
  
  const handleShowWithdrawal = () => {
    setShowWithdrawal(!showWithdrawal); 
  }

  // Define wallet addresses for each coin
  const walletAddresses = {
    bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Example address
    ethereum: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88', // Example address
    // Add more coins and their associated wallet addresses as needed
  };

  // Function to copy wallet address based on selected coin
  const copyWalletAddress = () => {
    if (selectedCoin) {
      const walletAddress = walletAddresses[selectedCoin.id.toLowerCase()];
      if (walletAddress) {
        navigator.clipboard.writeText(walletAddress)
          .then(() => {
            alert(`Wallet address copied: ${walletAddress}`);
          })
          .catch(err => {
            console.error('Failed to copy wallet address: ', err);
          });
      } else {
        alert(`No wallet address available for ${selectedCoin.name}`);
      }
    } else {
      alert('Please select a coin first.');
    }
  };

  return (
    <>
      <div className="container mx-auto pb-5 pt-5">
        {/* Full-screen overlay for transaction popup */}
        {transaction && (
          <div className={`w-full h-screen overflow-hidden bg-black bg-opacity-60 fixed left-0 top-0 flex justify-center items-center md:px-6`} onClick={handleOutsideClick}>
            <div className='flex flex-col bg-white text-slate-800 rounded-lg shadow-lg m-auto w-[90%] md:w-[60%] p-5 h-auto relative z-30'>
              <button onClick={() => setTransaction(false)} className="mt-2 text-slate-800 rounded-full cursor-pointer absolute right-3 top-0">
                <X />
              </button>
              {/* Modal content */}
              <div className='flex flex-wrap justify-around'>
                <section className='flex flex-row items-center justify-between'>
                  {selectedCoin && (
                    <div className="flex flex-row items-center gap-x-5">
                      <img src={selectedCoin.image} alt={selectedCoin.name} className="w-20 h-20 rounded-full" />
                      <div>
                        <h2 className="text-xl font-bold">{selectedCoin.name}</h2>
                        <p className="md:text-lg ">~{userWallet[selectedCoin.id]?.toFixed(2) || 0}</p>
                        <p className="md:text-lg font-thin">
                          ~ ${(userWallet[selectedCoin.id] ? (userWallet[selectedCoin.id] * selectedCoin.currentPrice).toFixed(2) : 0)}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
                <div className='flex flex-wrap items-center justify-start gap-x-3 my-4'>
                  <DBButtonOne buttonValue={'Deposit'} Clicked={handleShowDeposit} />
                  <DBButtonTwo buttonValue={'Withdraw'} Clicked={handleShowWithdrawal} />
                </div>
              </div>
              <Txn />
            </div>
          </div>
        )}
        {showDeposit && (
          <Modal
            isOpen={showDeposit}
            onClose={() => setShowDeposit(false)}
            title={`Deposit ${selectedCoin.id}`}
          >
            <div className="text-slate-800 p-5 flex flex-col gap-y-5">
            <ButtonOne buttonValue={`Copy ${selectedCoin.id} Wallet Address`} Clicked={copyWalletAddress} />
            <input placeholder='Amount' className='border-b border-slate-800 outline-none p-2 '/>
            <span className='w-1/2'>
            <DBButtonOne buttonValue={'Proceed'}/>
            </span>
            </div>
          </Modal>
        )}
        {showWithdrawal && (
          <Modal
            isOpen={showWithdrawal}
            onClose={() => setShowWithdrawal(false)}
            title={`Withdraw ${selectedCoin.name} to wallet`}
          >
            <div className="text-slate-800 p-5">
            <div className="text-slate-800 p-5 flex flex-col gap-y-5">
              <span className='flex flex-col'>
              <label htmlFor='withdraw_amount' className='font-bold'>
                Input Amount {'(USD):'}
              </label>
            <input placeholder='Amount' className='border-b border-slate-800 outline-none p-2' id='withdraw_amount'/>
              </span>
              <span className='flex flex-col'>
              <label htmlFor='wallet_address' className='font-bold'>
              Wallet Address:
              </label>
            <input placeholder='Wallet Address' className='border-b border-slate-800 outline-none p-2' id='wallet_address'/>
              </span>
            <span className='w-1/2'>
            <DBButtonOne buttonValue={'Proceed'}/>
            </span>
            </div>
            </div>
          </Modal>
        )}
        {/* Display total balance */}
        {!showTable && (
          <div className="mb-4 text-start font-bold px-6">
            <h2 className="text-lg font-semibold">Total Balance: ${formData.totalBalance.toFixed(2)}</h2>
          </div>
        )}

        <div className="mb-5 flex justify-between items-center px-5">
          <input
            type="text"
            placeholder="Search for coins..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md w-full md:w-1/2 text-slate-800"
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
            <div className="text-center translate-x-3 md:translate-x-16">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Error fetching data: {error.message}</p>
              <button onClick={refetch} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
                Retry
              </button>
            </div>
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
                      <tr key={coin.id} className="transition duration-200 ease-in-out hover:border-b" onClick={() => toggleTransaction(coin)}>
                        <td className="flex items-center py-4 px-6" >
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-4 rounded-full" />
                          <div>
                            <p className="font-semibold">{coin.name}</p>
                            {/* {!showOwnedCoins && <p className="text-sm">${coin.currentPrice.toFixed(2)}</p>} */}
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
                            <td className="py-4 px-6 text-right">
                              ${coin.currentPrice.toFixed(2)}
                            </td>
                            <td className={`py-4 px-6 text-right hidden md:table-cell ${coin.priceChange >= 0 ? 'text-green-500': 'text-red-500'}`}>
                              {coin.priceChange.toFixed(2)}%
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination Controls */}
            </>
          )}
          <div className="flex justify-center gap-x-5 mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-2 border rounded-md"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(totalUniqueCoins / pageLimit)))}
              disabled={page >= Math.ceil(totalUniqueCoins / pageLimit)}
              className="p-2 border rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoPricesTable;

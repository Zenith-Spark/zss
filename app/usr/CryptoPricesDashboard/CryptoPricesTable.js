'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useCryptoPrices from '@assets/app/components/resuables/CryptoPrices/CryptoPrices';
import { ButtonOne, DBButtonOne, DBButtonTwo } from '@assets/app/components/resuables/Buttons/Buttons';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { X } from 'lucide-react';
import Txn from '../transaction/Txn';
import Modal from '@assets/app/components/resuables/Modal/Modal';
import { LoaderStyle6Component, LoaderStyle8Component } from '@assets/app/components/resuables/Loader/Loader';
import axios from 'axios';
import { toast} from 'react-toastify';




const CryptoPricesTable = ({showTable}) => {
  const { formData, formatBalance } = useGlobalState();
  const userWallet = formData.userWallet;
  

  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOwnedCoins, setShowOwnedCoins] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const { coinsData, loading, error, refetch } = useCryptoPrices(currency, page);
  const [depositAmount, setDepositAmount] = useState('')
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  const [withdrawal, setWithdrawal] = useState('')
  const [userWalletAdd, setUserWalletAdd] = useState('')
  const [txnloading, settxnLoading] = useState('')
  const [Txnerror, settxnerror] = useState('')
  const [depositHistory, setDepositHistory] = useState([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [laoding, setLoading] = useState(false)
  


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


  const totalUniqueCoins = uniqueCoins.length;

  // Handle pagination of filtered coins
  const paginatedCoins = uniqueCoins.slice((page - 1) * pageLimit, page * pageLimit);

  const [transaction, setTransaction] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const toggleTransaction = (coin) => {
    setSelectedCoin(coin);
    setTransaction((prev) => !prev);
    fetchTransactions()
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
  const walletAddresses = formData.walletAddresses
  
 
  // Function to copy wallet address based on selected coin
  const copyWalletAddress = () => {
  const walletAddress = walletAddresses[selectedCoin.id.toLowerCase()];
    if (selectedCoin) {
      if (walletAddress) {
        navigator.clipboard.writeText(walletAddress)
          .then(() => {
            toast.success(`Wallet address copied: ${walletAddress}`,  {
              position: "top-right",
              autoClose: 5000,
            });
          })
          .catch(err => {
            console.error('Failed to copy wallet address: ', err);
          });
      } else {
        toast.error(`No wallet address available for ${selectedCoin.name}`,  {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } else {
      toast.warn('Please select a coin first.',  {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleSubmitDeposit = async (e) => {
    setLoading(true)
    e.preventDefault();
  
    // Prevent multiple submissions
    if (loading) return;
  
    if (!selectedCoin || !depositAmount) {
      toast.warn('Please select a coin and enter an amount.',  {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  
    setLoading(true); // Start loading when the request is being processed
  
    try {
      const response = await axios.post(
        `https://zss.pythonanywhere.com/api/v1/deposits/${selectedCoin.id}/`,
        { amount_usd: depositAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success('Deposit successful',  {
          position: "top-right",
          autoClose: 5000,
        });
        setDepositAmount(''); // Reset the deposit amount after success
        setLoading(false)
        fetchTransactions();
      } else {
        toast.error('Deposit failed',  {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false)
      }
    } catch (err) {
      console.error('Error during deposit:', err);
      toast.error('An error occurred while processing your deposit. Please try again.',  {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  const handleSubmitwithdrawal = async (e) => {
    setLoading(true)
    e.preventDefault();
  
    // Prevent multiple submissions
    if (loading) return;
  
    if (!selectedCoin || !withdrawal || !userWalletAdd) {
      toast.warn('Please enter an amount, wallet address, and select a coin.',  {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  
    // Check if the withdrawal amount is valid
    if (parseFloat(withdrawal) <= 0) {
      toast.warn('Please input a valid amount greater than 0.',  {
        position: "top-right",
        autoClose: 5000,
      });
      return; // Prevent form submission
    }
  
    setLoading(true); // Start loading when the request is being processed
  
    // Ensure withdrawal amount doesn't exceed the user's balance
    const userTotalValue = userWallet[selectedCoin.id] || 0;
    if (parseFloat(withdrawal) > userTotalValue) {
      toast.warn(`Insufficient funds. You can withdraw up to $${formatBalance(userTotalValue)} for ${selectedCoin.name}.`,  {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false); // Stop loading
      return;
    }
  
    try {
      const response = await axios.post(
        `https://zss.pythonanywhere.com/api/v1/withdrawals/${selectedCoin.id}/`,
        { amount_usd: withdrawal, wallet_address: userWalletAdd },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success('Withdrawal successful',  {
          position: "top-right",
          autoClose: 5000,
        });
        setWithdrawal('');
        setUserWalletAdd('');
        setLoading(false)
        setShowWithdrawal(false); // Close the modal after success
        fetchTransactions(); // Fetch transactions after a successful withdrawal
      } else {
        toast.error('Withdrawal failed',  {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error('Error during withdrawal:', err);
      toast.error('An error occurred while processing your withdrawal. Please try again.',  {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  
  
  
const fetchTransactions = useCallback(
  async () => {
    try {
      // Fetch deposits
      const depositResponse = await axios.get('https://zss.pythonanywhere.com/api/v1/deposits/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Fetch withdrawals
      const withdrawalResponse = await axios.get('https://zss.pythonanywhere.com/api/v1/withdrawals/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Set the states for deposits and withdrawals
      setDepositHistory(depositResponse.data.map(deposit => ({
        id: deposit.transaction_id,
        amount: deposit.amount_usd, // Assuming you want to show the USD amount
        status: deposit.status,
        date: deposit.created_at,
      })));
  
      setWithdrawalHistory(withdrawalResponse.data.map(withdrawal => ({
        id: withdrawal.transaction_id,
        amount: withdrawal.amount_usd, // Assuming you want to show the USD amount
        status: withdrawal.status,
        date: withdrawal.created_at,
      })));
    } catch (err) {
      settxnerror(err);
      toast.error('Error fetching transactions:' + err,  {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      settxnLoading(false);
    }
  }, [token]
);
useEffect(() => {
  fetchTransactions();
}, [token, fetchTransactions]);
 
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
                        <p className="md:text-lg ">~ {(userWallet[selectedCoin.id] ? (userWallet[selectedCoin.id] / selectedCoin.currentPrice) : 0)}</p>
                        <p className="md:text-lg font-thin">
                          ~ ${userWallet[selectedCoin.id] || 0} 
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
              {
                txnloading ? 'Loading' : Txnerror ? `error fetching data` : (
                  <Txn depositHistory={depositHistory} withdrawalHistory={withdrawalHistory} />
                )
              }
            </div>
          </div>
        )}
        {showDeposit && (
          <Modal
            isOpen={showDeposit}
            onClose={() => setShowDeposit(false)}
            title={`Deposit ${selectedCoin.id}`}
          >
            <ButtonOne buttonValue={`Copy ${selectedCoin.id} Wallet Address`} Clicked={copyWalletAddress} />
            <form className="text-slate-800 p-5 flex flex-col gap-y-5" onSubmit={handleSubmitDeposit}>
            <span className={`flex flex-col w-full`}>
            <label htmlFor='deposit_amount' className='font-bold w-full flex justify-between items-center'>
               <span>
               Input Amount {'(USD):'}
               </span>
               <span className={`text-xs flex flex-col gap-1`}>
                <p>
               Equiv in {selectedCoin.id}:
                </p>
                <p className={'text-right'}>
                  {depositAmount / selectedCoin.currentPrice}
                </p>
               </span>
              </label>
            <input 
            placeholder='Amount' 
            className='border-b border-slate-800 outline-none p-2 w-full'
            id={`deposit_amount`}
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            />
            </span>
            <span className='w-1/2'>
                            <DBButtonOne
                  buttonValue={laoding ? (
                    <LoaderStyle8Component smaillerSize={true} fill={'#ffffff'} />
                  ) : 'Proceed'}
                  disabled={laoding || !depositAmount || !selectedCoin}
                />
             </span>
            </form >
          </Modal>
        )}
        {showWithdrawal && (
          <Modal
            isOpen={showWithdrawal}
            onClose={() => setShowWithdrawal(false)}
            title={`Withdraw ${selectedCoin.name} to wallet`}
          >
            <form className="text-slate-800 p-5" onSubmit={handleSubmitwithdrawal}>
            <div className="text-slate-800 p-5 flex flex-col gap-y-5">
              <span className='flex flex-col'>
              <label htmlFor='withdraw_amount' className='font-bold w-full flex justify-between items-center'>
               <span>
               Input Amount {'(USD):'}
               </span>
               <span className={`text-xs flex flex-col gap-1`}>
                <p>
               Equiv in {selectedCoin.id}:
                </p>
                <p className={'text-right'}>
                  {withdrawal / selectedCoin.currentPrice}
                </p>
               </span>
              </label>
            <input placeholder='Amount' className='border-b border-slate-800 outline-none p-2' id='withdraw_amount' 
             value={withdrawal}
            onChange={(e) => setWithdrawal(e.target.value)}/>
              </span>
              <span className='flex flex-col'>
              <label htmlFor='wallet_address' className='font-bold'>
              Wallet Address:
              </label>
            <input placeholder='Wallet Address' className='border-b border-slate-800 outline-none p-2' id='wallet_address' 
             value={userWalletAdd}
             onChange={(e) => setUserWalletAdd(e.target.value)}
            />
              </span>
            <span className='w-1/2'>
            <DBButtonOne
                  buttonValue={laoding ? (
                    <LoaderStyle8Component smaillerSize={true} fill={'#ffffff'} />
                  ) : 'Proceed'}
                  disabled={laoding || !withdrawal || !userWalletAdd}
                />
            </span>
            </div>
            </form>
          </Modal>
        )}
        {/* Display total balance */}
          {
            !showTable && (
              <div className="mb-4 text-start font-bold px-6">
            <h2 className="text-lg font-semibold">Total Balance: ${formData.totalBalance !== null && !isNaN(formData.totalBalance) ? formatBalance(formData.totalBalance) : 0.00}
            </h2>
          </div>
            )
          }

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
              <LoaderStyle6Component />
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
                    {showOwnedCoins && <th className="text-right px-6">Worth (USD)</th>}
                    {showOwnedCoins && <th className="text-right px-6">eqv (coin)</th>}
                    {!showOwnedCoins && <th className="text-right px-6">Rate</th>}
                    {!showOwnedCoins && <th className="text-right px-6 hidden md:table-cell">Price Change</th>}
                  </tr>
                </thead>
                <tbody className="text-xs md:text-base">
                  {paginatedCoins.map((coin) => {
                    const userCoinAmount = userWallet[coin.id] || 0;
                    const userTotalValue = userCoinAmount / coin.currentPrice;
                    const coinSymbol = coin.symbol ? coin.symbol.toUpperCase() : '';

                    return (
                      <tr key={coin.id} className="transition duration-200 ease-in-out hover:border-b" onClick={() => toggleTransaction(coin)}>
                        <td className="flex items-center py-4 px-6" >
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-4 rounded-full" />
                          <div>
                            <p className="font-semibold">{coin.name}</p>
                          </div>
                        </td>
                        {showOwnedCoins && (
                          <>
                            <td className="py-4 px-6 text-right">
                            $ {formatBalance(userCoinAmount)} 
                            </td>
                            <td className="py-4 px-6 text-right">
                              {userTotalValue} {coinSymbol}
                            </td>
                          </>
                        )}
                        {!showOwnedCoins && (
                          <>
                            <td className="py-4 px-6 text-right">
                              ${formatBalance(coin.currentPrice)}
                            </td>
                            <td className={`py-4 px-6 text-right hidden md:table-cell ${coin.priceChange >= 0 ? 'text-green-500': 'text-red-500'}`}>
                              {coin.priceChange}%
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

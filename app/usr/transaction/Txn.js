'use client';
import React, { useState } from 'react';

const Txn = () => {
  const [showTxn, setShowTxn] = useState(true); // Set to true to show Transaction History first

  // Sample data for transaction history
  const transactionHistory = [
    { id: 'TXN123', amount: 100, status: 'Completed', date: '2024-01-01' },
    { id: 'TXN124', amount: 50, status: 'Pending', date: '2024-01-02' },
  ];

  // Sample data for withdrawal history
  const withdrawalHistory = [
    { id: 'WD123', amount: 30, status: 'Completed', date: '2024-01-03' },
    { id: 'WD124', amount: 20, status: 'Failed', date: '2024-01-04' },
  ];

  // Function to set status color
  const getStatusColor = (status) => {
    if (status === 'Completed') return 'text-green-500';
    if (status === 'Pending') return 'text-yellow-500';
    if (status === 'Failed') return 'text-red-500';
    return '';
  };

  return (
    <div className="w-full h-full mt-4 text-slate-800">
      <div className="text-center w-full mb-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowTxn(true)}
            className={`p-2 text-xs md:text-base ${showTxn ? 'border-b-2 border-blue-500' : ''} w-1/2`}
          >
            Deposit History
          </button>
          <button
            onClick={() => setShowTxn(false)}
            className={`p-2 text-xs md:text-base ${!showTxn ? 'border-b-2 border-blue-500' : ''} w-1/2`}
          >
            Withdrawal History
          </button>
        </div>
      </div>

      {/* Display Transaction History Table */}
      {showTxn && (
        <div className="">
          {transactionHistory.length > 0 ? (
            <table className="min-w-full table-auto text-xs md:text-base">
              <thead>
                <tr className="">
                  <th className="p-2 text-left">TXN ID</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-right">Status</th>
                  <th className="p-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map(txn => (
                  <tr key={txn.id} className="transition duration-200">
                    <td className="p-2">{txn.id}</td>
                    <td className="p-2 text-right">${txn.amount.toFixed(2)}</td>
                    <td className={`p-2 ${getStatusColor(txn.status)} text-right`}>
                      {txn.status}
                    </td>
                    <td className="p-2 text-right">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-lg font-bold">No transactions available.</p>
          )}
        </div>
      )}

      {/* Display Withdrawal History Table */}
      {!showTxn && (
        <div className="overflow-hidden">
          {withdrawalHistory.length > 0 ? (
            <table className="min-w-full table-auto text-xs md:text-base">
              <thead>
                <tr className="">
                  <th className="p-2 text-left">TXN ID</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-right">Status</th>
                  <th className="p-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalHistory.map(withdrawal => (
                  <tr key={withdrawal.id} className="transition duration-200">
                    <td className="p-2">{withdrawal.id}</td>
                    <td className="p-2 text-right">${withdrawal.amount.toFixed(2)}</td>
                    <td className={`p-2 ${getStatusColor(withdrawal.status)} text-right`}>
                      {withdrawal.status}
                    </td>
                    <td className="p-2 text-right">{withdrawal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-lg font-bold">No withdrawals available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Txn;

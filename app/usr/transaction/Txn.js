'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Txn = ({ depositHistory = [], withdrawalHistory = [] }) => {
  const [showTxn, setShowTxn] = useState(true); // Set to true to show Deposit History first

  // Function to set status color
  const getStatusColor = (status) => {
    if (status === 'completed') return 'text-green-500';
    if (status === 'pending') return 'text-yellow-500';
    if (status === 'failed') return 'text-red-500';
    return '';
  };

  return (
    <div className="w-full max-h-[50dvh] h-auto mt-4 text-slate-800 overflow-scroll scrollbar-thin">
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

      {/* Display Deposit History Table */}
      {showTxn ? (
        <div>
          {depositHistory.length > 0 ? (
            <table className="min-w-full table-auto text-xs md:text-base">
              <thead>
                <tr>
                  <th className="p-2 text-left">TXN ID</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-right">Status</th>
                  <th className="p-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {depositHistory.map(txn => (
                  <tr key={txn.id} className="transition duration-200">
                    <td className="p-2">{txn.id}</td>
                    <td className="p-2 text-right">${parseFloat(txn.amount).toFixed(2)}</td>
                    <td className={`p-2 ${getStatusColor(txn.status)} text-right`}>
                      {txn.status}
                    </td>
                    <td className='text-xs ml-2 text-right'>{new Date(txn.date).toLocaleString()}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-lg font-bold">No deposits available for this coin.</p>
          )}
        </div>
      ) : (
        <div className="overflow-hidden">
          {/* Display Withdrawal History Table */}
          {withdrawalHistory.length > 0 ? (
            <table className="min-w-full table-auto text-xs md:text-base">
              <thead>
                <tr>
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
                    <td className="p-2 text-right">${parseFloat(withdrawal.amount).toFixed(2)}</td>
                    <td className={`p-2 ${getStatusColor(withdrawal.status)} text-right`}>
                      {withdrawal.status}
                    </td>
                    <td className='text-xs ml-2 text-right'>{new Date(withdrawal.date).toLocaleString()}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-lg font-bold">No withdrawals available for this coin.</p>
          )}
        </div>
      )}
    </div>
  );
};

// PropTypes for validation
Txn.propTypes = {
  depositHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
  withdrawalHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
};

export default Txn;

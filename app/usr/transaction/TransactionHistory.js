// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Txn from './Txn';

// const TransactionHistory = () => {
//   const [depositHistory, setDepositHistory] = useState([]);
//   const [withdrawalHistory, setWithdrawalHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         // Fetch deposits
//         const depositResponse = await axios.get('https://zss.pythonanywhere.com/api/v1/deposits/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Fetch withdrawals
//         const withdrawalResponse = await axios.get('https://zss.pythonanywhere.com/api/v1/withdrawals/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Set the states for deposits and withdrawals
//         setDepositHistory(depositResponse.data.map(deposit => ({
//           id: deposit.transaction_id,
//           amount: deposit.amount_usd, // Assuming you want to show the USD amount
//           status: deposit.status,
//           date: deposit.created_at,
//         })));

//         setWithdrawalHistory(withdrawalResponse.data.map(withdrawal => ({
//           id: withdrawal.transaction_id,
//           amount: withdrawal.amount_usd, // Assuming you want to show the USD amount
//           status: withdrawal.status,
//           date: withdrawal.created_at,
//         })));
//       } catch (err) {
//         setError(err);
//         console.error('Error fetching transactions:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [token]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching transactions: {error.message}</div>;

//   return (
//     <Txn depositHistory={depositHistory} withdrawalHistory={withdrawalHistory} />
//   );
// };

// export default TransactionHistory;

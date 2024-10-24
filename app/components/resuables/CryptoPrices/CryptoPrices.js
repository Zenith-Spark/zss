'use client';
// components/reusables/CryptoPrices/useCryptoPrices.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useCryptoPrices = (currency, page, limit = 50) => {
  const [coinsData, setCoinsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCoins, setTotalCoins] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: currency,
          order: 'market_cap_desc',
          per_page: limit,
          page: page,
          sparkline: false,
        },
      });

      const formattedData = response.data.map((coin) => ({
        id: coin.id,
        name: coin.name,
        image: coin.image,
        currentPrice: coin.current_price,
        marketCap: coin.market_cap,
        priceChange: coin.price_change_percentage_24h,
      }));

      // If it's the first page, reset the coins data
      if (page === 1) {
        setCoinsData(formattedData);
      } else {
        // Append new coins only if they are not already in the state
        setCoinsData((prevCoins) => {
          const existingIds = new Set(prevCoins.map((coin) => coin.id));
          const newCoins = formattedData.filter((coin) => !existingIds.has(coin.id));
          return [...prevCoins, ...newCoins];
        });
      }

      // If the data length is less than the limit, there are no more coins to fetch
      if (formattedData.length < limit) {
        setHasMore(false);
      }

      const totalAvailableCoins = 6000; // Use response for actual total if available
      setTotalCoins(totalAvailableCoins);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [currency, page, limit]);

  // Refetch function to call fetchData
  const refetch = () => {
    fetchData(); // Just call fetchData; no need to reset coinsData
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, page]); // Fetch data whenever the page changes

  return { coinsData, loading, error, totalCoins, hasMore, refetch };
};

export default useCryptoPrices;

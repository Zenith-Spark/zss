'use client';
// components/reusables/CryptoPrices/useCryptoPrices.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCryptoPrices = (currency, page) => {
  const [coinsData, setCoinsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCoins, setTotalCoins] = useState(0); // For pagination

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 20, // Fetch 100 coins per page
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
        
        setCoinsData(formattedData);
        setTotalCoins(response.headers['x-total-count']); // Set total coins for pagination
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency, page]);

  return { coinsData, loading, error, totalCoins };
};

export default useCryptoPrices;

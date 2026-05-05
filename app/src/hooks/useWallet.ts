import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [price, setPrice] = useState(0);

  async function load() {
    const [w, p] = await Promise.all([
      api.get('/wallet'),
      api.get('/market/btc'),
    ]);

    setWallet(w.data);
    setPrice(p.data.price);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return { wallet, price, reload: load };
}
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Input from '../../components/Input';
import { api } from '../../services/api';
import { formatBRL, formatBTC } from '../../utils/format';

export default function Trade() {
  const [value, setValue] = useState('');
  const [wallet, setWallet] = useState<any>(null);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const [walletRes, marketRes] = await Promise.all([
      api.get('/wallet'),
      api.get('/market/btc'),
    ]);

    setWallet(walletRes.data);
    setPrice(marketRes.data.price);
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // ======================
  // 🟢 COMPRA
  // ======================
  async function handleBuy() {
    const amount = Number(value);

    if (!amount || amount <= 0) {
      return Alert.alert('Erro', 'Digite um valor válido');
    }

    if (amount > wallet.balance_brl) {
      return Alert.alert('Erro', 'Saldo insuficiente em reais');
    }

    try {
      setLoading(true);

      await api.post('/trade/buy', { amount });

      Alert.alert('Sucesso', 'Compra realizada!');
      setValue('');
      await loadData(); // 🔥 atualiza saldo
    } catch {
      Alert.alert('Erro', 'Falha na compra');
    } finally {
      setLoading(false);
    }
  }

  // ======================
  // 🔴 VENDA
  // ======================
  async function handleSell() {
    const amount = Number(value);

    if (!amount || amount <= 0) {
      return Alert.alert('Erro', 'Digite um valor válido');
    }

    // converte valor BRL -> BTC
    const btcAmount = amount / price;

    if (btcAmount > wallet.balance_btc) {
      return Alert.alert('Erro', 'Saldo insuficiente em BTC');
    }

    try {
      setLoading(true);

      await api.post('/trade/sell', { amount });

      Alert.alert('Sucesso', 'Venda realizada!');
      setValue('');
      await loadData(); // 🔥 atualiza saldo
    } catch {
      Alert.alert('Erro', 'Falha na venda');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trade BTC</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Saldo BRL</Text>
        <Text style={styles.value}>
          {formatBRL(wallet?.balance_brl || 0)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Saldo BTC</Text>
        <Text style={styles.value}>
          {formatBTC(wallet?.balance_btc || 0)}
        </Text>
      </View>

      <View style={styles.cardHighlight}>
        <Text style={styles.label}>Preço BTC</Text>
        <Text style={styles.price}>{formatBRL(price)}</Text>
      </View>

      <Input
        placeholder="Valor em R$"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleBuy}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Comprar BTC</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonSell, loading && { opacity: 0.6 }]}
        onPress={handleSell}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Vender BTC</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHighlight: {
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#22C55E',
    borderWidth: 1,
  },
  label: {
    color: '#AAA',
    fontSize: 13,
  },
  value: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 5,
  },
  price: {
    color: '#22C55E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#22C55E',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonSell: {
    backgroundColor: '#EF4444',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
});
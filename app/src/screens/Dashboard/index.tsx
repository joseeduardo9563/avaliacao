import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { api } from '../../services/api';
import { formatBRL, formatBTC } from '../../utils/format';

export default function Dashboard({ navigation }: any) {
  const [wallet, setWallet] = useState<any>(null);
  const [price, setPrice] = useState<number>(0);

  async function loadData() {
    try {
      const [walletRes, marketRes] = await Promise.all([
        api.get('/wallet'),
        api.get('/market/btc'),
      ]);

      setWallet(walletRes.data);
      setPrice(marketRes.data.price);
    } catch (error) {
      console.log('Erro ao carregar dados');
    }
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 5000); // atualiza a cada 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Saldo em Reais</Text>
        <Text style={styles.value}>
          {formatBRL(wallet?.balance_brl || 0)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Saldo em BTC</Text>
        <Text style={styles.value}>
          {formatBTC(wallet?.balance_btc || 0)}
        </Text>
      </View>

      <View style={styles.cardHighlight}>
        <Text style={styles.label}>Preço BTC</Text>
        <Text style={styles.price}>
          {formatBRL(price)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Trade')}
      >
        <Text style={styles.buttonText}>Comprar / Vender</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Transactions')}
      >
        <Text style={styles.buttonText}>Ver Histórico</Text>
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
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardHighlight: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  label: {
    color: '#AAA',
    fontSize: 14,
  },
  value: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 5,
  },
  price: {
    color: '#22C55E',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#22C55E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
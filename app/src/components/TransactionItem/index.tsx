import { View, Text, StyleSheet } from 'react-native';
import { formatBRL, formatBTC } from '../../utils/format';
import { formatDate } from '../../utils/date';

export default function TransactionItem({ item }: any) {
  const isBuy = item.type === 'buy';

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.type}>
          {isBuy ? 'Compra BTC' : 'Venda BTC'}
        </Text>

        <Text style={styles.date}>
          {formatDate(item.created_at)}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={[
            styles.amount,
            { color: isBuy ? '#22C55E' : '#EF4444' },
          ]}
        >
          {isBuy ? '+' : '-'} {formatBTC(item.amount_btc)} BTC
        </Text>

        <Text style={styles.value}>
          {formatBRL(item.amount_brl)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 4,
  },
});
import { TextInput, StyleSheet } from 'react-native';

export default function Input(props: any) {
  return (
    <TextInput
      placeholderTextColor="#888"
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
});
import { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Input from '../../components/Input';
import { AuthContext } from '../../context/AuthContext';

export default function Register({ navigation }: any) {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    if (password.length < 6) {
      return Alert.alert('Erro', 'Senha deve ter no mínimo 6 caracteres');
    }

    try {
      setLoading(true);
      await signUp(name, email, password);

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.response?.data?.message || 'Erro ao cadastrar'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <Input
        placeholder="Nome"
        onChangeText={setName}
      />

      <Input
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <Input
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>
          Já tem conta? Fazer login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#22C55E',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    color: '#22C55E',
    textAlign: 'center',
    marginTop: 15,
  },
});
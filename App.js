import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

// ⚠️ TROQUE "localhost" pelo IP da sua máquina (use ipconfig no PC)
const SERVER_URL = 'http://172.24.32.1:3000/status';

export default function App() {
  const [bluetoothAtivo, setBluetoothAtivo] = useState(false);

 
  async function enviarStatusParaBackend(ativo) {
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bluetooth: ativo ? 'Ativo' : 'Desativado',
        }),
      });

      const data = await response.json();
      Alert.alert('Servidor', data.mensagem || 'Status enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar status:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }

  
  async function alternarBluetooth() {
    const novoStatus = !bluetoothAtivo;
    setBluetoothAtivo(novoStatus);

 
    setTimeout(() => {
      Alert.alert(
        'Bluetooth',
        novoStatus ? 'Bluetooth foi ligado 🔵' : 'Bluetooth foi desligado ⚪'
      );
    }, 100);

    await enviarStatusParaBackend(novoStatus);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📶 Controle de Bluetooth</Text>

      <Text
        style={[
          styles.status,
          { color: bluetoothAtivo ? 'green' : 'red' },
        ]}
      >
        Status: {bluetoothAtivo ? 'Ativo' : 'Desativado'}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: bluetoothAtivo ? '#FF3B30' : '#007AFF' },
        ]}
        onPress={alternarBluetooth}
      >
        <Text style={styles.buttonText}>
          {bluetoothAtivo ? 'Desligar Bluetooth' : 'Ligar Bluetooth'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF2FF',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#0056d6',
  },
  status: {
    fontSize: 22,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

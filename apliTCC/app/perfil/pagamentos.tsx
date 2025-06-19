import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../src/global/api';

export default function Pagamentos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tipo, setTipo] = useState<'credito' | 'debito'>('credito');
  const [numero, setNumero] = useState('');
  const [nomeTitular, setNomeTitular] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [userId, setUserId] = useState('');
  const [cartaoCredito, setCartaoCredito] = useState<any>(null);
  const [cartaoDebito, setCartaoDebito] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      if (id) {
        setUserId(id);
        fetch(`${getApiUrl()}/users`)
          .then(res => res.json())
          .then(users => {
            const user = users.find((u: any) => u._id === id);
            if (user) {
              setCartaoCredito(user.cartaoCredito);
              setCartaoDebito(user.cartaoDebito);
            }
          });
      }
    });
  }, [modalVisible]);

  const salvarCartao = async () => {
    if (!numero || !nomeTitular || !validade || !cvv) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    const cartaoData = {
      numero,
      nomeTitular,
      validade,
      cvv,
    };

    const body = tipo === 'credito'
      ? { cartaoCredito: cartaoData }
      : { cartaoDebito: cartaoData };

    try {
      await fetch(`${getApiUrl()}/users/${userId}/cartao`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setModalVisible(false);
      setNumero('');
      setNomeTitular('');
      setValidade('');
      setCvv('');
    } catch (err) {
      Alert.alert('Erro ao salvar cartão');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cartões Cadastrados</Text>
      {cartaoCredito && cartaoCredito.numero && (
        <Text>Crédito: **** **** **** {cartaoCredito.numero.slice(-4)}</Text>
      )}
      {cartaoDebito && cartaoDebito.numero && (
        <Text>Débito: **** **** **** {cartaoDebito.numero.slice(-4)}</Text>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>+ Adicionar novo cartão</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.title}>Novo Cartão</Text>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <TouchableOpacity onPress={() => setTipo('credito')}>
              <Text style={tipo === 'credito' ? styles.selected : { marginRight: 20 }}>Crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTipo('debito')}>
              <Text style={tipo === 'debito' ? styles.selected : {}}>Débito</Text>
            </TouchableOpacity>
          </View>
          <TextInput placeholder="Número" value={numero} onChangeText={setNumero} style={styles.input} keyboardType="numeric" />
          <TextInput placeholder="Nome no cartão" value={nomeTitular} onChangeText={setNomeTitular} style={styles.input} />
          <TextInput placeholder="Validade (MM/AA)" value={validade} onChangeText={setValidade} style={styles.input} />
          <TextInput placeholder="CVV" value={cvv} onChangeText={setCvv} style={styles.input} keyboardType="numeric" secureTextEntry />
          <TouchableOpacity style={styles.addButton} onPress={salvarCartao}>
            <Text style={styles.addText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ color: 'red', marginTop: 20 }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  addButton: { marginTop: 30 },
  addText: { color: '#007BFF', fontSize: 16, fontWeight: '600' },
  modalContent: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 8 },
  selected: { fontWeight: 'bold', color: '#007BFF', marginRight: 20 },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Pagamentos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cartões Cadastrados</Text>
      <Text>Cartão de Crédito: **** **** **** 1234</Text>
      <Text>Cartão de Débito: **** **** **** 5678</Text>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>+ Adicionar novo cartão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  addButton: { marginTop: 30 },
  addText: { color: '#007BFF', fontSize: 16, fontWeight: '600' },
});

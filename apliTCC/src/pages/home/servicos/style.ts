import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 60,
      paddingBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#222',
      marginBottom: 16,
      textAlign: 'center',
    },
    pesquisaInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 16,
      fontSize: 14,
      color: '#333',
    },
    filtrosContainer: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 12,
    },
    filtroBotao: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
      backgroundColor: '#eee',
    },
    filtroBotaoAtivo: {
      backgroundColor: '#007AFF',
    },
    filtroTexto: {
      fontSize: 14,
      color: '#555',
    },
    filtroTextoAtivo: {
      color: '#fff',
      fontWeight: 'bold',
    },
    ordenacaoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
      marginBottom: 16,
    },
    ordenarBotao: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: '#eee',
    },
    ordenarBotaoAtivo: {
      backgroundColor: '#007AFF',
    },
    ordenarTexto: {
      fontSize: 13,
      color: '#555',
    },
    ordenarTextoAtivo: {
      color: '#fff',
      fontWeight: 'bold',
    },
    lista: {
      gap: 16,
    },
    card: {
      backgroundColor: '#f9f9f9',
      padding: 16,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    usuario: {
      fontSize: 14,
      color: '#444',
      marginBottom: 4,
    },
    nomeServico: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 6,
    },
    status: {
      fontSize: 14,
      color: '#007AFF',
      marginBottom: 4,
    },
    data: {
      fontSize: 12,
      color: '#888',
      marginBottom: 10,
    },
    botaoTexto: {
      color: '#fff',
      fontWeight: 'bold',
    },
    semResultados: {
      textAlign: 'center',
      fontSize: 14,
      color: '#888',
      marginTop: 40,
    },
    cardTitle:{

    },
    cardDesc: {

    },
    

  });
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 'auto',
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 12,
  },
  cardPrice: {
    fontSize: 18,
    color: '#000',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  cardInfo: {
    fontSize: 14,
    color: '#000',
    marginTop: 2,
  },
});

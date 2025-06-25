import { StyleSheet } from "react-native";
import { themas } from "@/src/global/themes";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 10,
  },
  caixa1: {
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 10,
    marginBottom: 5,
    textAlign: "left",
  },
  caixa2: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: "solid",
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
    padding: 10,
    marginBottom: 50,
    textAlign: "left",
  },
  textEmail: {
    fontSize: 16,
    color: "black",
  },
  textCel: {
    fontSize: 16,
    color: "black",
  },
  textUsu: {
    fontSize: 16,
    color: "black",
  },
  titlleEmail: {
    fontSize: 19,
    color: "black",
    marginTop: 2,
  },
  titlleCel: {
    fontSize: 19,
    color: "black",
    marginTop: 15,
  },
  titlleUsu: {
    fontSize: 19,
    color: "black",
    marginTop: 15,
  },
  textAlterar: {
    fontSize: 14,
    color: "black",
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 3,
    padding: 10,
    marginVertical: 3,
    fontSize: 14,
    backgroundColor: 'white',
  },
  botaoSalvar: {
    width: 90,
    height: 30,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themas.colors.primary,
    borderRadius: 40,
    elevation: 7,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

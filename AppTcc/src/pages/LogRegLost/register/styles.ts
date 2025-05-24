import { themas } from "@/src/global/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  caixa1: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  caixa2: {
    width: "100%",
    maxWidth: 400,
  },
  caixa3: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingBottom: 60,
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 20,
  },
  titleInput: {
    marginLeft: 5,
    color: themas.colors.gray,
    marginTop: 20,
  },
  boxInput: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: themas.colors.lightGray,
    borderColor: themas.colors.lightGray,
  },
  input: {
    flex: 1,
    height: "100%",
    borderRadius: 40,
    paddingLeft: 5,
  },
  button: {
    width: 250,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themas.colors.primary,
    borderRadius: 40,
    elevation: 7,
  },
  textButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  textBotton: {
    fontSize: 16,
    color: themas.colors.gray,
    marginTop: 20,
  },
  textBottonCreate: {
    color: themas.colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

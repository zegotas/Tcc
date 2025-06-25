import { themas } from "@/src/global/themes";
import { Platform, StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  caixa1: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height / 3,
    width: 200,
  },
  caixa2: {
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 10,
  },
  caixa3: {
    marginTop: 30,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
  text: {
    fontWeight: "bold",
    marginTop: 40,
    fontSize: 18,
  },
  titleInput: {
    marginLeft: 5,
    color: themas.colors.gray,
    marginTop: 20,
  },
  boxInput: {
    width: "100%",
    height: 50,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  rememberBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 5,
    color: themas.colors.gray,
  },
  forgotText: {
    color: themas.colors.primary,
    fontWeight: "bold",
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
  textEntrar: {
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
    fontSize: 16,
    color: themas.colors.primary,
    fontWeight: "bold",
  },
});

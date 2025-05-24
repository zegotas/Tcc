import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "../src/pages/LogRegLost/register/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "@/src/global/themes";
import { useRouter } from "expo-router";


export default function Register() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cpfCnpj, setCpfCnpj] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  function formatCpfCnpj(text: string) {
    const cleaned = text.replace(/\D/g, "");

    if (cleaned.length <= 11) {
      return cleaned
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    } else {
      return cleaned
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
    }
  }

  function formatDate(text: string) {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }

  function handleRegister() {
    const cpfCnpjDigits = cpfCnpj.replace(/\D/g, "");
    const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!name || !email || !cpfCnpj || !birthDate || !password || !confirmPassword) {
      return Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: 'Preencha todos os campos!',});
    }

    if (!email.includes("@")) {
      return Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: 'Insira um email válido!',});
    }

    if (cpfCnpjDigits.length !== 11 && cpfCnpjDigits.length !== 14) {
      return Toast.show({
        type: 'error',
        text1: 'CPF ou CNPJ inválido',
        text2: 'Insira um CPF com 11 dígitos ou um CNPJ com 14.',});
    }

    if (!dataRegex.test(birthDate)) {
      return Toast.show({
        type: 'error',
        text1: 'Data inválida',
        text2: 'Use o formato DD/MM/AAAA.',});
    }

    if (password !== confirmPassword) {
      return Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'As senhas não coincidem.',});
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Cadastro realizado com sucesso!',});
      router.replace("/");
    }, 2000);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 40,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.caixa1}>
          <Text style={styles.text}>Crie sua Conta</Text>
        </View>

        <View style={styles.caixa2}>
          <Text style={styles.titleInput}>Nome</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              underlineColorAndroid="transparent"
            />
            <MaterialIcons name="person" size={20} color={themas.colors.gray} />
          </View>

          <Text style={styles.titleInput}>Email</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              underlineColorAndroid="transparent"
            />
            <MaterialIcons name="email" size={20} color={themas.colors.gray} />
          </View>

          <Text style={styles.titleInput}>CPF ou CNPJ</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF ou CNPJ"
              value={cpfCnpj}
              onChangeText={(text) => setCpfCnpj(formatCpfCnpj(text))}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
            />
            <MaterialIcons name="badge" size={20} color={themas.colors.gray} />
          </View>

          <Text style={styles.titleInput}>Data de Nascimento</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={birthDate}
              onChangeText={(text) => setBirthDate(formatDate(text))}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
            />
            <MaterialIcons name="calendar-today" size={20} color={themas.colors.gray} />
          </View>

          <Text style={styles.titleInput}>Senha</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color={themas.colors.gray}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.titleInput}>Confirmar Senha</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <MaterialIcons
                name={showConfirmPassword ? "visibility" : "visibility-off"}
                size={20}
                color={themas.colors.gray}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.caixa3}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.textButton}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/")}>
            <Text style={styles.textBotton}>
              Já tem uma conta?
              <Text style={styles.textBottonCreate}> Voltar para o login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

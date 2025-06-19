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
import { getApiUrl } from "../src/global/api";


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

  function formatDateToISO(date: string) {
    // Expects date in DD/MM/YYYY and returns YYYY-MM-DD
    const [day, month, year] = date.split("/");
    if (day && month && year) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return "";
  }

  async function handleRegister() {
    try {
      setLoading(true);

      // Valide os campos conforme necessário
      if (!name || !email || !cpfCnpj || !birthDate || !password || !confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Atenção!",
          text2: "Preencha todos os campos!",
        });
        return;
      }

      const response = await fetch(`${getApiUrl()}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
    nome: name,
    email,
    cpfCnpj,
    dataNascimento: formatDateToISO(birthDate), // <-- aqui!
    senha: password,
          // Adicione outros campos se necessário
        }),
      });

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Cadastro realizado com sucesso!",
        });
        router.replace("/");
      } else {
        const error = await response.json();
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: error.erro || "Erro ao cadastrar.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro de conexão com o servidor.",
      });
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.text}>Crie sua conta</Text>
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

          <Text style={styles.titleInput}>Data de nascimento</Text>
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

          <Text style={styles.titleInput}>Confirmar senha</Text>
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

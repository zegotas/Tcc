import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "../src/pages/LogRegLost/login/styles";
import Logo from "../src/assets/logo.png";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "@/src/global/themes";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from "../src/global/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getLogin() {
    try {
      setLoading(true);

      if (!email || !password) {
        Toast.show({
          type: "error",
          text1: "Atenção!",
          text2: "Preencha todos os campos!",
        });
        return;
      }

      if (!email.includes("@")) {
        Toast.show({
          type: "error",
          text1: "E-mail inválido",
          text2: "Insira um e-mail com @",
        });
        return;
      }

      // Busca todos os usuários cadastrados
      const response = await fetch(`${getApiUrl()}/users`);
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      const users = await response.json();

      // Procura usuário com email e senha informados
      const user = users.find(
        (u: any) => u.email === email && u.senha === password
      );

      if (user) {
        await AsyncStorage.setItem('userId', user._id); // Salva o id
        Toast.show({
          type: "success",
          text1: "Login realizado com sucesso!",
          text2: "Bem-vindo de volta!",
        });
        router.push('/drawer/(tabs)/home');
      } else {
        Toast.show({
          type: "error",
          text1: "Atenção!",
          text2: "Email ou senha inválidos!",
        });
      }
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao conectar com o servidor",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => router.push('/drawer/(tabs)/home')}>
          <Text style={styles.textBotton}>Tela home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.caixa1}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.text}>Bem-vindo</Text>
      </View>

      <View style={styles.caixa2}>
        <Text style={styles.titleInput}>Email</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
          <MaterialIcons name="email" size={20} color={themas.colors.gray} />
        </View>

        <Text style={styles.titleInput}>Senha</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
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

        <View style={styles.row}>
          <View style={styles.rememberBox}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: "#ccc", true: themas.colors.primary }}
              thumbColor={"white"}
            />
            <Text style={styles.rememberText}>Lembrar meus dados</Text>
          </View>

          <TouchableOpacity onPress={() => router.push("/lembrarsenha")}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.caixa3}>
        <Pressable
          onPress={getLogin}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          style={[
            styles.button,
            isHovered && { backgroundColor: "#1b5e20" },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.textEntrar}>Entrar</Text>
          )}
        </Pressable>
      </View>

      <TouchableOpacity onPress={() => router.replace("/register")}>
        <Text style={styles.textBotton}>
          Não tem cadastro?
          <Text style={styles.textBottonCreate}> Cadastre-se!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "../src/pages/LogRegLost/lembrarsenha/styles";
import { MaterialIcons } from "@expo/vector-icons";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { router } from "expo-router";

export default function LembrarSenha() {
  const [selected, setSelected] = useState<"email" | "sms">("email");
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleEnviar = () => {
    if (selected === "email") {
      if (!emailOrPhone || !emailOrPhone.includes("@")) {
        Toast.show({ 
          type: "error", 
          text1: "Erro", 
          text2: "Insira um email válido."
        });
        return;
      }
    } else {
      if (!emailOrPhone || !isValidPhoneNumber(emailOrPhone)) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Insira um número de telefone válido com DDI. Ex: +55 11 99999-9999",
        });
        return;
      }
    }

    Keyboard.dismiss();
    Toast.show({ 
      type: "success", 
      text1: "Sucesso", 
      text2: "Instruções de redefinição foram enviadas." 
    });
  };

  const handlePhoneInput = (text: string) => {
    const cleaned = text.replace(/[^\d+]/g, "");
    const parsed = parsePhoneNumberFromString(cleaned);

    if (parsed) {
      setEmailOrPhone(parsed.formatInternational());
    } else {
      setEmailOrPhone(cleaned.startsWith("+") ? cleaned : "+" + cleaned);
    }
  };

  const handleSelect = (type: "email" | "sms") => {
    setSelected(type);
    setEmailOrPhone("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            Atualizar senha, email ou número de telefone
          </Text>

          <Text style={styles.label}>
            Como você prefere redefinir sua senha?
          </Text>

          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => handleSelect("email")}
            >
              <MaterialIcons
                name={
                  selected === "email"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={20}
                color="#444"
              />
              <Text style={styles.radioLabel}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => handleSelect("sms")}
            >
              <MaterialIcons
                name={
                  selected === "sms"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={20}
                color="#444"
              />
              <Text style={styles.radioLabel}>Mensagem de texto (SMS)</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.infoText}>
            Enviaremos um {selected === "email" ? "email" : "SMS"} com instruções de como redefinir sua senha.
          </Text>

          <TextInput
            placeholder={selected === "email" ? "Digite seu email" : "Ex: +55 11 99999-9999"}
            value={emailOrPhone}
            onChangeText={selected === "sms" ? handlePhoneInput : setEmailOrPhone}
            style={selected === "sms" ? styles.inputPhone : styles.input}
            keyboardType={selected === "email" ? "email-address" : "phone-pad"}
            underlineColorAndroid="transparent"
          />

          {selected === "sms" && (
            <Text style={styles.helperText}>
              Digite o número com o código do país. Ex: +55 para Brasil
            </Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>
              {selected === "email" ? "Enviar por email" : "Enviar por SMS"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/")}>
            <Text style={styles.backToLogin}>Voltar para o login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PasswordInput from "../../src/components/PasswordInputs";
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import colors from "../../src/consts/colors";
import { useRouter } from "expo-router";
import axios from "../../src/api/axios";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import useAuthStore from "../../src/store/auth"; // adjust the path as needed
import * as SecureStore from "expo-secure-store";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post("/auth/token", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const refresh = res.data.refresh_token;
      const token = res.data.access_token;

      useAuthStore.getState().setAccessToken(token);
      await SecureStore.setItemAsync("refreshToken", refresh);

      router.replace("/home");
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      let msg =
        error.status === 401 ? "Invalid credentials." : "Something went wrong.";
      Toast.show({
        text1: msg,
        type: "error",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Tasty<Text style={{ color: colors.primary }}>Ties</Text>
            </Text>
            <Text style={styles.subtitle}>A tasty way to connect</Text>
          </View>

          <View style={styles.form}>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              iconName="mail-outline"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <PasswordInput
              onChangeText={(password) => setPassword(password)}
              value={password}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button title="Login" onPress={handleLogin} />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <Pressable
                onPress={() => {
                  router.push("/register");
                }}
              >
                <Text style={styles.signupLink}>Register.</Text>
              </Pressable>
            </View>

            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f8f8f8",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#333",
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default LoginPage;

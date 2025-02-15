import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PasswordInput from "../../src/components/PasswordInputs";
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import colors from "../../src/consts/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RegisterDataType, registerSchema } from "../../src/schemas/auth";
import { z } from "zod";

const RegisterPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<RegisterDataType>({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setErrors({});

      const l = registerSchema.parse(userData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Tasty<Text style={{ color: colors.primary }}>Ties</Text>
            </Text>
            <Text style={styles.subtitle}>A tasty way to connect</Text>
          </View>

          <View style={styles.form}>
            <Input
              iconName="mail-outline"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={userData.email}
              onChangeText={(email) => setUserData({ ...userData, email })}
              error={errors.email}
            />
            <Input
              iconName="person-circle"
              placeholder="Display Name"
              value={userData.displayName}
              onChangeText={(displayName) =>
                setUserData({ ...userData, displayName })
              }
              error={errors.displayName}
            />
            <PasswordInput
              value={userData.password}
              onChangeText={(password) =>
                setUserData({ ...userData, password })
              }
              placeholder="Password"
              error={errors.password}
            />
            <PasswordInput
              value={userData.confirmPassword}
              onChangeText={(confirmPassword) =>
                setUserData({ ...userData, confirmPassword })
              }
              placeholder="Confirm Password"
              error={errors.confirmPassword}
            />
            <Button title="Register" onPress={handleRegister} />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Already a member ? </Text>
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Text style={styles.signupLink}>Login</Text>
              </Pressable>
            </View>
            <ActivityIndicator
              size="large"
              color={colors.primary}
              animating={loading}
            />
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
    justifyContent: "flex-start", // Changed from center
    paddingBottom: Platform.OS === "ios" ? 40 : 20, // Add extra padding at bottom
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

export default RegisterPage;

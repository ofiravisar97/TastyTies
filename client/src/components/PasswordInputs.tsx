import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  setPassword: (password: string) => void;
  password: string;
};

const PasswordInput = ({ setPassword, password }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#666" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.eyeIcon}
      >
        <Ionicons
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 4,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 12,
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
});

export default PasswordInput;

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import colors from "../consts/colors";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  iconName: IconName;
  error?: string;
} & TextInputProps;

const Input = ({ iconName, error, ...props }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name={iconName} size={20} color="#666" />
        <TextInput style={styles.input} {...props} />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
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
  error: {
    fontSize: 14,
    color: colors.error,
    paddingHorizontal: 8,
  },
  container: {
    gap: 8,
    flex: 1,
    flexDirection: "column",
  },
});

export default Input;

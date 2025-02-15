import {
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../consts/colors";

type Props = {
  onPress: () => any;
  title: string;
  disabled?: boolean;
};

const Button = ({ title, onPress, disabled }: Props) => {
  if (Platform.OS === "ios") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.loginButton}
        disabled={disabled}
      >
        <Text style={styles.loginButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      disabled={disabled}
      background={TouchableNativeFeedback.Ripple("#888", false)}
    >
      <View style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    overflow: "hidden",
    shadowColor: "#333",
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 1 },
    elevation: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Button;

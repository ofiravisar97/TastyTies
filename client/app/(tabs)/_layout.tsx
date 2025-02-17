import { Tabs, Redirect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../src/consts/colors";
import useAuthStore from "../../src/store/auth"; // adjust the path as needed
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        Tasty<Text style={{ color: colors.primary }}>Ties</Text>
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  if (!useAuthStore.getState().accessToken) {
    return <Redirect href="/login" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <CustomHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            header: () => null,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
            header: () => null,
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
            header: () => null,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
            header: () => null,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle" size={size} color={color} />
            ),
            header: () => null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 5, // Adjust for the status bar
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
});

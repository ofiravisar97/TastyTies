import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../src/consts/colors";
import { title } from "process";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
      }}
    ></Tabs>
  );
}

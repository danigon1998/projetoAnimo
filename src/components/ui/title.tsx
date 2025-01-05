import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../../../theme";

interface TitleProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  color?: string; // Color del texto
  align?: "left" | "center" | "right";
  style?: any; 
}

export default function Title({ 
  children, 
  size = "medium",
  color = theme.colors.textPrimary, 
  align = "left",
  style 
}: TitleProps) {
  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <Text 
      style={[
        styles.base, 
        sizeStyles[size], 
        { color: color, textAlign: align }, 
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  small: {
    fontSize: 16,
  },
  medium: {
    fontSize: 24,
  },
  large: {
    fontSize: 32,
  },
});

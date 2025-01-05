import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import InputText from "../../components/ui/inputText";
import Title from "../../components/ui/title";
import theme from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function Login() {
    const navigation = useNavigation<any>();

    const {Login} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
    <View style={styles.container}>
        <Title>Login</Title>
        <InputText
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <InputText
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry = {true}
        />
        <TouchableOpacity onPress={() => Login(email, password)}>
            <Text>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Criar Conta</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 20,
  },
});
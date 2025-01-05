import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import InputText from "../../components/ui/inputText";
import theme from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function Register() {

    const {Register} = useContext(AuthContext);

    const navigation = useNavigation<any>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister() {
        if(name === "" || email === "" || password === "") {
            Alert.alert("Preencha todos os campos");
            return;
        }
        Register(name, email, password);
    }

    return (
    <View style={styles.container}>
        <InputText 
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
        />
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
        <TouchableOpacity onPress={handleRegister}>
            <Text>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Já tenho uma conta</Text>
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
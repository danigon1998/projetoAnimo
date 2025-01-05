import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../interfaces/IUser";
import { auth, authenticateUser, registerUser, fetchUserData, updateLastLogin } from "../services/api";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

interface IAuthContext {
    children: React.ReactNode;
}

interface IAuthContextData {
    user: IUser | null;
    Login: (email: string, password: string) => Promise<void>;
    Register: (name: string, email: string, password: string) => Promise<void>;
    SignOut: () => Promise<void>;
    loading: boolean;
    signed: boolean;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export default function AuthProvider({children}:IAuthContext){
    const [user, setUser] = useState<IUser|null>(null);
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(
        () => {
            async function loadStorageData(){
                const storageUser = await AsyncStorage.getItem("@user");
                if(storageUser){
                    const userData: IUser = JSON.parse(storageUser);
                    setSigned(true);
                    setUser(userData);
                }
                setLoading(false);
            }
            loadStorageData();
        }, []
    )

    async function Login(email: string, password: string) {
        try {
            const userCredential = await authenticateUser(email, password);
            const uid = userCredential.user.uid;
            const userData = await fetchUserData(uid);
            console.log("Usuário encontrado", userData);

            if(!userData){
                console.error("Usuário não encontrado");
                return;
            }
            
            await updateLastLogin(uid);
            setUser(userData);
            await AsyncStorage.setItem("@user", JSON.stringify(userData));
            setSigned(true);
    
            
        } catch (error) {
            console.error("Erro no login", error);
        }
    }

    async function Register(name:string, email:string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const newUser: IUser = {
                id: user.uid,
                name: name,
                email: email,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                moodHistory: [],
                profilePicture: "",
                lastLogin: serverTimestamp(),
                preferences: {
                    theme: "light",
                    notificationsEnabled: true,
                    language: "pt"
                }
            };
            await registerUser(newUser);
            navigation.navigate("Login");

        } catch (error) {
            console.log(error);
        }
    }

    async function SignOut(){
        await AsyncStorage.clear().then(() => {
            setUser(null);
            setSigned(false);
        });
    }

    return (
        <AuthContext.Provider value={{user, Login, Register, SignOut ,loading, signed}}>
            {children}
        </AuthContext.Provider>
    );
}
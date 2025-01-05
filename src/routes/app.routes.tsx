import { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { AuthContext } from "../contexts/auth";

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
    const { SignOut } = useContext(AuthContext);

    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <View style={{ flex: 1 }}>
                    <DrawerItem 
                        label="Home" 
                        onPress={() => props.navigation.navigate("Home")} 
                    />
                    <DrawerItem 
                        label="Profile" 
                        onPress={() => props.navigation.navigate("Profile")} 
                    />
                    <DrawerItem 
                        label="Sair do App" 
                        onPress={() => SignOut()} 
                    />
                </View>
            )}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}

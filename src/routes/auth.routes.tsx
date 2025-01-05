import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const Stack = createStackNavigator();

export default function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Register" component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
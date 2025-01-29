import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {Bar, CartesianChart, useChartPressState} from "victory-native";
import { useAnimatedProps } from "react-native-reanimated";

export default function History(){

    const DATA = [
        {mood: 'happy', frequency: 5},
        {mood: 'sad', frequency:2},
        {mood: 'angry', frequency: 1},
        {mood: 'neutral', frequency: 3},
        {mood: 'surprised', frequency: 4},
        {mood: 'disgusted', frequency: 8},
        {mood: 'fearful', frequency: 6},
    ];

    const {state, isActive} = useChartPressState({x : 0, y : {frequency: 0}})

    const animatedText = useAnimatedProps(()=>{
        return{
            text: `${state.y.frequency.value.value}`,
            defaultValue: '',
        }
    })

    return(
        <View style={styles.container}>
            <View style={{width:'90%', height:350}}>
                <CartesianChart
                data={DATA}
                xKey="mood"
                yKeys={["frequency"]}
                chartPressState={state}
                >
                    {({points, chartBounds})=>{
                        console.log( points, chartBounds)
                        return(
                            (
                        
                                <Bar
                                points={points.frequency}
                                chartBounds={chartBounds}
                                color="red"
                                barWidth={20}
                                roundedCorners={{topLeft:4,topRight:4}}
                                />
                            
                            )
                        )
                    }}
                </CartesianChart>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})
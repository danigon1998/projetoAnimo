import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { AuthContext } from '../../contexts/auth'
import { updateEmotion } from '../../services/api'
import { IMoodEntry } from '../../interfaces/IUser'

export default function Home() {
  const [texto,setTexto] = useState('');
  const [result, setResult] = useState('');
  const [mood, setMood] = useState<IMoodEntry|null>(null);

  const {user} = useContext(AuthContext);

  async function CreateMoodEntry(mood: string): Promise<IMoodEntry>{
    return{
      mood,
      date: new Date(),
      timeOfDay: GetTimeOfDay(),
    }
  }

  function GetTimeOfDay(): string{
    const hour = new Date().getHours();
    if(hour < 6){
      return 'dawn';
    }else if(hour < 12){
      return 'morning';
    }else if(hour < 18){
      return 'afternoon';
    }else{
      return 'night';
    }
  }

  async function SendSentence(){
    try {
      const response = await axios.post("http://192.168.0.21:5000/predict", {texto})
      setResult(response.data)
      if(user && response.data){
        const newMood = await CreateMoodEntry(response.data);
        setMood(newMood);
        await updateEmotion(user.id, newMood);
      }
    } catch (error) {
      
    }
  }

  return (
    <View>
      <Text>Home</Text>
      <TextInput 
      style={{borderColor: 'black', borderWidth: 1}} 
      value={texto} 
      placeholder="Coloca como te sientes" 
      onChangeText={setTexto}
      />
      <TouchableOpacity onPress={SendSentence}>
        <Text>Enviar</Text>
      </TouchableOpacity>
      <Text>
        {result}
      </Text>
    </View>
  )
}
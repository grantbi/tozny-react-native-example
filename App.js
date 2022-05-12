import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ToznyService from './app/services/ToznyService';
import { USERNAME, PASSWORD } from '@env'

export default function App() {
  const [identity, setIdentity] = useState()
  const [username, setUsername] = useState(USERNAME)
  const [password, setPassword] = useState(PASSWORD)
  const [disabled, setDisabled] = useState(false)

  const onLogin = useCallback(async () => {
    setDisabled(true)
    await ToznyService.login(username, password).then(identity => setIdentity(identity))
    setDisabled(false)
  })
  const onSendFileRecord = useCallback(() => {
    const base64Image = "data:image/jpg;base64,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"
    ToznyService.createFileRecord(base64Image)
  })

  return (
    <View style={styles.container}>
      {!identity 
      ? <View style={styles.loginView}>
          <Text>Pleaes Login</Text>
          <TextInput placeholder="Username" onChangeText={setUsername} value={username} />
          <TextInput placeholder="Password" onChangeText={setPassword} value={password} />
          <Button title={disabled ? "Logging in..." : "Login"} onPress={onLogin} disabled={disabled}/>
        </View>
      : <View>
          <Button title="Send File Record" onPress={onSendFileRecord} />
        </View>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  loginView: {
    maxHeight:"25%",
    flex: 1,
    justifyContent: 'space-evenly',
  }
});

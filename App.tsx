import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({
  id: 'session',
  encryptionKey: 'secret',
});

export default function App() {
  const [value, setValue] = useState(storage.getString('value'));

  const session = Array(254).fill('0').join('');

  const setValueInMMKV = () => {
    storage.set('value', session);
    setValue(session);
  };

  const deleteValueFromMMKV = () => {
    storage.delete('value');
    setValue('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.value}>Value: {value}</Text>
        <Text style={styles.value}>Keys: {storage.getAllKeys()}</Text>
        <View style={styles.sectionContainer}>
          <View>
            <Text>Step 1: Let's store a value in MMKV to start with.</Text>
            <Pressable style={styles.button} onPress={setValueInMMKV}>
              <Text style={styles.buttonText}>Set Value</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text>
            Step 2: Reload the app a couple of times and notice that the value
            stays.
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text>Step 3: Let's remove the value from the store:</Text>
          <Pressable style={styles.button} onPress={deleteValueFromMMKV}>
            <Text style={styles.buttonText}>Remove Value</Text>
          </Pressable>
        </View>
        <View style={styles.sectionContainer}>
          <Text>
            Step 4: Go back to Step 1. The second time through the value will be
            lost on reload. If you then close the application and reopen it, the
            value will reappear and the sequence will start over. This only
            happens when the text length being stored is &gt; 253 characters.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  value: {
    color: 'white',
    backgroundColor: 'red',
    fontWeight: '700',
    textAlign: 'center',
    padding: 10,
  },
  button: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
});

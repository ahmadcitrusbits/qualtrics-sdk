/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
// import Qualtrics from 'react-native-qualtrics';
const Qualtrics = {};
import {NativeModules} from 'react-native';
const {RNQualtricsDigital} = NativeModules || {}
console.log({NativeModules, RNQualtricsDigital});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function initMe() {
    console.log('Initializing...');
    Qualtrics.initializeProjectWithExtRefId(
      'northwestcompany',
      'ZN_1BUTdAdrNbaHMrA',
      '',
      initializationResults => {
        console.log(initializationResults);
        console.log('Initialization Done');
      },
    );
  }

  function evalMe() {
    console.log('Evaluating...');
    Qualtrics.evaluateProject(targetingResults => {
      console.log(targetingResults);
      for (var intercept in targetingResults) {
        let result = targetingResults[intercept];
        if (result.passed) {
          Qualtrics.display();
        }
      }
      console.log('Evaluation Done');
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Button title="Initialize Me" onPress={() => initMe()} />
      </View>
      <View>
        <Button title="Evaluate & Display Me" onPress={() => evalMe()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

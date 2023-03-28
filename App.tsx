/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Qualtrics from 'react-native-qualtrics';

function App(): JSX.Element {
  function initMe() {
    console.log('Initializing...');
    Qualtrics.initializeProjectWithExtRefId(
      'brandid',
      'projectid',
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
    <SafeAreaView style={{backgroundColor: Colors.lighter}}>
      <StatusBar barStyle={'light-content'} />
      <Button title="Initialize Me" onPress={() => initMe()} />
      <Button title="Evaluate & Display Me" onPress={() => evalMe()} />
    </SafeAreaView>
  );
}

export default App;

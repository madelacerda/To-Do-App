import React from 'react';
import {View} from 'react-native';
import MainNavigator from './routes/MainNavigator';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Provider store={store}>
      <View style={{flex: 1}}>
        <MainNavigator />
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
};

export default App;

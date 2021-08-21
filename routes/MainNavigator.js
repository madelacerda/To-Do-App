import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {ToDoHome, ToDoForm} from '../views';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ToDoHome"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        animation="fade">
        <Stack.Screen
          name="ToDoHome"
          component={ToDoHome}
          options={{
            title: 'To-Do App',
            headerStyle: {
              borderBottomColor: '#F2F2F2',
              borderBottomWidth: 1,
            },
            headerRight: () => (
              <View style={styles.conteinerBtns}>
                <TouchableHighlight>
                  <Icon name="search" size={18} color="#424141" />
                </TouchableHighlight>
                <TouchableHighlight>
                  <IconMI name="notifications-none" size={22} color="#424141" />
                </TouchableHighlight>
                <TouchableHighlight>
                  <IconMI name="menu" size={22} color="#424141" />
                </TouchableHighlight>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ToDoForm"
          component={ToDoForm}
          options={() => ({
            title: 'ToDoForm',
            headerStyle: {
              borderBottomColor: '#F8F9F9',
              borderBottomWidth: 1,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  conteinerBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 90,
    marginRight: 15,
    justifyContent: 'space-between',
  },
});

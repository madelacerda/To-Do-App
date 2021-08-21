import React from 'react';
import {View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const Select = props => {
  return (
    <RNPickerSelect
      {...props}
      useNativeAndroidPickerStyle={false}
      style={props.error ? stylesError : styles}
      Icon={() => {
        return (
          <View style={styles.contIcon}>
            <Icon name="keyboard-arrow-down" size={20} color="#C6C5C6" />
          </View>
        );
      }}
    />
  );
};

Select.propTypes = {
  error: PropTypes.bool,
  placeholder: PropTypes.object,
  onValueChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
};

export default Select;

const styles = StyleSheet.create({
  inputAndroid: {
    backgroundColor: '#F8F9F9',
    borderRadius: 10,
    height: 45,
    paddingLeft: 15,
    marginVertical: 7,
    color: '#424141',
  },
  contIcon: {
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
const stylesError = StyleSheet.create({
  inputAndroid: {
    backgroundColor: '#F8F9F9',
    borderRadius: 10,
    height: 45,
    paddingLeft: 15,
    marginVertical: 7,
    color: '#424141',
    borderWidth: 1,
    borderColor: '#FD5148',
  },
});

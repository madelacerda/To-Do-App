import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

const DatePicker = props => {
  const {value, mode, icon, placeholder} = props;
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (mode === 'date') {
        setDateTime(
          date.getFullYear() +
            '-' +
            String(date.getMonth() + 1).padStart(2, 0) +
            '-' +
            String(date.getDate()).padStart(2, 0),
        );
      } else {
        let ampm = date.getHours() < 12 ? 'a.m' : 'p.m';
        setDateTime(
          String(date.getHours()).padStart(2, 0) +
            ':' +
            String(date.getMinutes()).padStart(2, 0) +
            ' ' +
            ampm,
        );
      }
    }
  }, [value, mode]);
  return (
    <Container {...props} underlayColor="transparent">
      <>
        {value ? (
          <Text>{dateTime}</Text>
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}
        {icon && <Icon name={icon} size={20} color="#C6C5C6" />}
      </>
    </Container>
  );
};

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  mode: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default DatePicker;

const Container = styled.TouchableHighlight`
  background-color: #f8f9f9;
  padding: 13px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
  ${props =>
    props.error &&
    css`
      border-width: 1px;
      border-color: #fd5148;
    `}
`;

const Placeholder = styled.Text`
  color: #c6c5c6;
`;

const Text = styled.Text``;

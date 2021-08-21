import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

const CustomButton = styled.TouchableHighlight`
  border-radius: 15px;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 14px;
  ${props =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;

const TextButton = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

const Button = props => {
  return (
    <CustomButton
      {...props}
      underlayColor={props.color ? props.color : 'transparent'}>
      <TextButton>{props.children}</TextButton>
    </CustomButton>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
};

export default Button;

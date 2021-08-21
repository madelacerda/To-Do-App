import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

const TextInput = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 10px;
  padding-left: 15px;
  ${props =>
    props.error &&
    css`
      border-width: 1px;
      border-color: #fd5148;
    `}
`;

const CustomInput = props => {
  return <TextInput {...props} />;
};
CustomInput.propTypes = {
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default CustomInput;

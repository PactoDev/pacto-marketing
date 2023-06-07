import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logoImg from '../../../assets/image/logo.png';

const Img = styled.img`
  width: 100%;
  height: auto;
  width: 180px;
`;

const Logo = ({
  small,
  ...props
}) => (
  <Img
    alt="logo"
    src={logoImg}
    {...props}
  />
);

Logo.propTypes = { small: PropTypes.bool };

Logo.defaultProps = { small: false };

export default Logo;

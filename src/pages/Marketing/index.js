import {
  useState,
  useEffect,
} from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  size, palette,
} from 'styled-theme';

import propTypes from '../../propTypes';

import Flex from '../../components/atoms/Flex';

import tile from '../../assets/image/tile.png';
import plant from '../../assets/image/plants.png';

const Wrapper = styled(Flex)`
  flex: 1;
  flex-direction: row;
  background-color: ${palette('primary', 0)};

`;

const Background = styled(Flex)`
  background-image: url(${tile});
  background-position: bottom left;
  margin-bottom: 195px;
  position: absolute;
  left: -36px;
  right: 0px;
  bottom: 0px;
  top: -36px;
`;

const Plant = styled(Flex)`
  background-image: url(${plant});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin-top 140px;
  margin-bottom: 70px;
`;

const Marketing = (props) => {
  const { ...others } = props;
  // import Card from '../../components/atoms/Card';
  return (
    <Wrapper>
      <Background />
      <Plant />
    </Wrapper>
  );
};

Marketing.propTypes = { ...propTypes.reactRouter };

export default Marketing;

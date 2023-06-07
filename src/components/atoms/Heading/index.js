import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  font, palette,
} from 'styled-theme';
import {
  ifProp, switchProp, prop,
} from 'styled-tools';

const styles = css`
  font-size: ${switchProp(prop('level'), {
    1: '36px',
    2: '18px',
    3: '18px',
    4: '16px',
  })};
  line-height: ${switchProp(prop('level'), {
    1: '50px',
    2: '24px',
    3: '24px',
    4: '20px',
  })};
  font-weight: ${switchProp(prop('level'), {
    1: '700',
    2: '700',
    3: '500',
    4: '500',
  })};
  margin-top: 16px;
  margin-bottom: ${switchProp(prop('level'), {
    1: '36px',
    2: '22px',
    3: '18px',
    4: '16px',
  })};
  text-align: ${ifProp({ center: true }, 'center')};
`;

const Heading = styled(
  ({
    level,
    children,
    reverse,
    theme,
    ...props
  }) => React.createElement(`h${level}`, props, children),
)`
  ${styles};
`;

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
};

Heading.defaultProps = {
  level: 1,
  palette: 'secondary',
};

export default Heading;

import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  font, palette,
} from 'styled-theme';

const Label = styled.label`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 1 }, 3)};
  font-size: 16px;
  line-height: 24px;
`;

Label.propTypes = { palette: PropTypes.string };

Label.defaultProps = { palette: 'grayscale' };

export default Label;

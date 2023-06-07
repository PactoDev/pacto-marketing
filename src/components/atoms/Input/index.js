import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  font, palette,
} from 'styled-theme';
import { ifProp } from 'styled-tools';
// import { ReactComponent as Check } from '../Icon/icons/check.svg';
// import ThreeStateCheckboxSpan from './ThreeStateCheckboxSpan.js';

const borderColor = ({
  disabled,
  invalid,
}) => {
  if (disabled) return palette('grayscale', 4);
  if (invalid) return palette('red', 3);
  return palette('grayscale', 3);
};

const hoverBorderColor = ({ disabled }) => {
  return disabled ? palette('grayscale', 4) : palette('primary', 0);
};

const checkBorderColor = ({ disabled }) => {
  return disabled ? palette('grayscale', 4) : palette('primary', 0);
};

const styles = css`
  /* display: block; */
  display: ${ifProp({ type: 'threeStatesCheckbox' }, 'none', 'block')};
  font-family: ${font('primary')};
  font-size: 14px; /* 14px */
  width: 100%;
  /* height */
  ${ifProp(
    { type: 'textarea' },
    css`
      height: auto;
    `,
    css`
      height: 2rem;
    `,
  )};
  ${ifProp(
    { type: 'textarea' },
    css`
      min-height: 6rem;
    `,
  )} padding: ${ifProp({ type: 'textarea' }, '8px', '0 8px')};
  box-sizing: border-box;
  color: ${ifProp('disabled', palette('grayscale', 0), palette('black', 0))};
  background-color: ${ifProp('disabled', palette('grayscale', 2), palette('white', 0))};
  border: 0.0625rem solid ${borderColor};
  border-radius: 0.25rem;
  outline: none;

  &[type='checkbox'],
  &[type='radio'] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 8px 0 0;
  }

  &::placeholder {
    color: ${palette('grayscale', 4)};
  }

  &:focus {
    border-color: ${palette('primary', 3)};
  }
`;

const Wrapper = styled.label`
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 8px;
  margin-bottom: 0rem;
  user-select: none;
  /* & > [type='checkbox'], */
  & > [type='radio'] {
    position: absolute;
    opacity: 0;
  }
  & > .check {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 0.0625rem solid; // 1px
    border-color: ${borderColor};
    background-color: ${palette('white', 0)};
    border-radius: ${ifProp({ type: 'checkbox' }, '0.125rem', '100%')};
    height: 14px;
    width: 14px;
    &:hover {
      border-color: ${hoverBorderColor};
    }
    ${ifProp(
    { type: 'checkbox' },
    css`
        // checkbox
        & > svg {
          fill: none;
          stroke: none;
        }
      `,
    css`
        // radio
        &::before {
          display: block;
          content: '';
          border-radius: 100%;
          height: 8px;
          width: 8px;
          margin: auto;
        }
      `,
  )};
  }

  /* CHECK STATE */
  /* & > [type='checkbox']:checked ~ .check, */
  & > [type='radio']:checked ~ .check {
    border-color: ${checkBorderColor};
    ${ifProp(
    { type: 'checkbox' },
    css`
        // checkbox
        background-color: ${ifProp('disabled', palette('white', 0), palette('primary', 3))};
        background-color:#37C5B9;
        & > svg {
          stroke: ${ifProp('disabled', palette('grayscale', 4), palette('white', 0))};
        }
      `,
    css`
        // radio
        &::before {
          background-color: ${checkBorderColor};
        }
      `,
  )};
  }
`;

const StyledTextarea = styled.textarea`
  ${styles};
`;
const StyledInput = styled.input`
  ${styles};
  margin: 12px 0px;
`;
const LabelWrapper = styled.div`
  position: relative;
  font-family: ${font('primary')};
  color: ${ifProp('disabled', palette('grayscale', 4), palette('grayscale', 1))};
`;

const RadioImageWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 1.5rem;
  border: 3px solid #E8F2FF;
  border-radius: 5px;
  height: 200px;
  width: 300px;
  background-size: cover;
  background-image: ${(props) => (props.imgSrc ? `url(${props.imgSrc})` : '')};
  &:checked {
    border: 3px solid #37C5B9;
  }
`;

const Container = styled.div`
  display: block;
  height: ${ifProp('imgSrc', '200px', 'auto')};
  margin: 15px;
`;

const stateForThreeStatesCheckbox = (currentState) => {
  if (currentState === 'empty') return 'checked';
  if (currentState === 'checked') return 'X';
  return 'empty';
};

const Input = ({ ...props }) => {
  const [
    checkState,
    setCheckState,
  ] = useState('empty');
  const {
    type,
    label,
    imgSrc,
    inputStyle,
  } = props;

  if (type === 'textarea') {
    return <StyledTextarea {...props} style={inputStyle} />;
  }
  if (type === 'radio' || type === 'checkbox') {
    return (
      <Container imgSrc={imgSrc}>
        <Wrapper {...props}>
          {type === 'checkbox' && <StyledInput {...props} style={inputStyle} />}
          {type !== 'checkbox' && <StyledInput {...props} style={inputStyle} />}
          {type === 'radio' && <span className="check" />}
          {/* {type === 'checkbox' && <Check className="check" />} */}
          {/* {type === 'checkbox' && <span className="check" />} */}
          {label && <LabelWrapper>{label}</LabelWrapper>}
          {imgSrc && <RadioImageWrapper imgSrc={imgSrc} />}
        </Wrapper>
      </Container>
    );
  }

  // if (type === 'threeStatesCheckbox') {
  //   return (
  //     <Container>
  //       <Wrapper {...props}>
  //         <StyledInput {...props} onClick={() => { setCheckState(stateForThreeStatesCheckbox(checkState)); }} />
  //         <ThreeStateCheckboxSpan checkState={checkState} />
  //         {label && <LabelWrapper>{label}</LabelWrapper>}
  //       </Wrapper>
  //     </Container>
  //   );
  // }

  return (
    <Wrapper>
      {label && <LabelWrapper>{label}</LabelWrapper>}
      <StyledInput {...props} />
    </Wrapper>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  reverse: PropTypes.bool,
  invalid: PropTypes.bool,
  label: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  reverse: false,
  invalid: false,
  label: 'input label',
};

export default Input;

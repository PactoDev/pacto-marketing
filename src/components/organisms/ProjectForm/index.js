import React, {
  Fragment, useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Formik, useFormik,
} from 'formik';
import styled from 'styled-components';
import {
  palette, size,
} from 'styled-theme';

import map from 'lodash/map';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import flatMap from 'lodash/flatMap';
import reduce from 'lodash/reduce';
import get from 'lodash/get';
import find from 'lodash/find';
import merge from 'lodash/merge';
import isNull from 'lodash/isNull';

import P from '../../atoms/P';
import Heading from '../../atoms/Heading';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

import metaMask from '../../../services/metaMask';

const StyledHeading = styled(Heading)`
  line-height: ${size('lineHeight.heading.h3')};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledError = styled(P)`
  color: ${palette('error', 1)};
  background-color: #f7dddd;
  padding: 0.36px 8px;
  border: ${palette('error', 1)} 1px solid;
  border-radius: 4px;
  transition: all 1s ease;
  margin-bottom: 36px;
`;

const ProjectForm = (props) => {
  const {
    formName,
    initialValues,
    validate,
  } = props;

  const [
    submitting,
    setSubmitting,
  ] = useState(false);
  const [
    error,
    setError,
  ] = useState(null);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
        console.log(values);
        await metaMask.generateNFT(values);
        setSubmitting(false);
      } catch (e) {
        setSubmitting(false);
        setError(e.message);
      }
    },
  });

  return (
    <>
      <StyledHeading level={3}>{formName || 'Project Form'}</StyledHeading>
      <StyledForm
        onSubmit={formik.handleSubmit}
      >
        <Input
          label="Project ID"
          name="id"
          type="number"
          onChange={formik.handleChange}
          value={get(formik, 'values.id', '')}
        />
        <Input
          label="Monthly Reward"
          name="monthlyReward"
          type="number"
          onChange={formik.handleChange}
          value={get(formik, 'values.monthlyReward', '')}
        />
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          onChange={formik.handleChange}
          value={get(formik, 'values.quantity', '')}
        />
        {error
          ? <StyledError semiBold error>{`${error} - Sorry, please try again!`}</StyledError>
          : null}
        <Button
          type="submit"
          style={{ margin: '12px 0px' }}
          loading={submitting}
        >
          Create Project
        </Button>
      </StyledForm>
    </>
  );
};

ProjectForm.defaultProps = { initialValues: {} };

ProjectForm.propTypes = {};

export default ProjectForm;

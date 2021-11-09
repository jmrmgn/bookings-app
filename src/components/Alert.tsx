import React from 'react';
import PropTypes from 'prop-types';
import { Alert as MUIAlert, AlertTitle } from '@mui/material';

interface Props {
  severity?: 'error' | 'info' | 'warning' | 'success';
  title: string;
  message: string | string[];
}

const Alert: React.FC<Props> = ({ severity = 'info', title, message }) => {
  const isMessageString = typeof message === 'string';
  return (
    <MUIAlert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {isMessageString
        ? message
        : message.map((text, index) => <p key={index}>{text}</p>)}
    </MUIAlert>
  );
};

Alert.propTypes = {
  severity: PropTypes.any,
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default Alert;

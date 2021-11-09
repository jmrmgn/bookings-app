import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, TextField } from '@mui/material';

interface Props {
  label: string;
  type?: string;
  value: any;
  onChange: (e: React.SyntheticEvent) => void;
  error?: string;
  inputProps?: any;
}

const InputField: React.FC<Props> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  inputProps,
}) => {
  const hasError = !!error;

  return (
    <FormControl error={hasError} fullWidth>
      <TextField
        error={hasError}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        inputProps={inputProps}
        size='small'
        variant='standard'
      />
      {hasError && (
        <FormHelperText id='component-error-text'>{error}</FormHelperText>
      )}
    </FormControl>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  inputProps: PropTypes.object,
};

export default InputField;

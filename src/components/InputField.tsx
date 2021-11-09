import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, TextField } from '@mui/material';

interface Props {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange?: (e: React.SyntheticEvent) => void;
  onBlur?: (e: React.SyntheticEvent) => void;
  error?: string | boolean;
  inputProps?: any;
  fixedLabel?: boolean;
}

const InputField: React.FC<Props> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  inputProps,
  fixedLabel,
}) => {
  const hasError = !!error;

  return (
    <FormControl error={hasError} fullWidth>
      <TextField
        error={hasError}
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={inputProps}
        size='small'
        variant='standard'
        helperText={error}
        InputLabelProps={{ shrink: fixedLabel }}
      />
    </FormControl>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  inputProps: PropTypes.object,
  fixedLabel: PropTypes.bool,
};

export default InputField;

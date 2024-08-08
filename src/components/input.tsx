import { TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface InputProps {
  label: string;
  error: boolean;
  name: string;
  helperText?: string;
  type: string;
  value: string;
  fullWidth?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  name,
  helperText,
  type,
  fullWidth,
  value,
  onChange,
}) => {
  return (
    <TextField
      error={error}
      id={name + '-id'}
      name={name}
      label={label}
      helperText={helperText}
      fullWidth={fullWidth}
      margin='normal'
      type={type}
      value={value}
      onChange={onChange}
      sx={{
        backgroundColor: '#224957',
        borderRadius: '8px',
        '& .MuiInputBase-root': {
          backgroundColor: '#224957',
          borderRadius: '8px',
          '& .MuiInputBase-input': {
            color: '#ffffff',
            '&::placeholder': {
              color: '#ffffff',
            },
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 30px #224957 inset !important`,
              WebkitTextFillColor: '#ffffff !important',
            },
          },
        },
        '& .MuiFormLabel-root': { color: '#ffffff' },
      }}
    />
  );
};

export default Input;

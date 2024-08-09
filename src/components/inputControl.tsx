import React, { useState, MouseEvent, ChangeEventHandler } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface InputControlProps {
  label: string;
  error: boolean;
  name: string;
  value: string;
  fullWidth?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: string;
}

const InputControl: React.FC<InputControlProps> = ({
  label,
  error,
  name,
  value,
  fullWidth = true,
  onChange,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <FormControl
      error={error}
      fullWidth={fullWidth}
      variant='outlined'
      sx={{
        backgroundColor: '#224957',
        borderRadius: '8px',
        margin: 'normal',
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#224957',
          borderRadius: '8px',
          color: '#ffffff',
          '& .MuiInputAdornment-root': {
            color: '#ffffff',
          },
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
    >
      <InputLabel htmlFor={name + '-id'}>{label}</InputLabel>
      <OutlinedInput
        id={name + '-id'}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {helperText && (
        <Typography
          variant='caption'
          style={{ color: '#f44336', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}
        >
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default InputControl;

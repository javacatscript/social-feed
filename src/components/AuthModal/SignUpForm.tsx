'use client';

// React
import { useState } from 'react';

// MUI
import { Box, TextField, Button, Typography, styled, Link, IconButton } from '@mui/material';
import { Login as LoginIcon, Close as CloseIcon } from '@mui/icons-material';

interface SignUpFormProps {
  onSubmit: () => void;
  onToggleMode: () => void;
  onClose: () => void;
}

const VALID_EMAILS = ['demo@example.com', 'test@user.com'];

// Styled Components
const FormWrapper = styled(Box)({
  position: 'relative',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '-16px',
  right: '-33px',
  color: '#666',
  padding: '4px',
  '&:hover': {
    color: '#000',
    backgroundColor: 'transparent',
  },
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const IconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '8px',
});

const IconCircle = styled(Box)({
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '1.5px solid #000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledLoginIcon = styled(LoginIcon)({
  fontSize: 24,
});

const FormTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '20px',
  color: '#000',
  marginBottom: '4px',
  textAlign: 'center',
});

const FormSubtitle = styled(Typography)({
  fontSize: '14px',
  color: '#666',
  marginBottom: '16px',
  textAlign: 'center',
});

const InputGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const InputLabel = styled(Typography)({
  fontWeight: 500,
  marginBottom: '8px',
  fontSize: '14px',
  color: '#000',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '14px 16px',
    fontSize: '14px',
    '&::placeholder': {
      color: '#999',
      opacity: 1,
    },
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: '#5E5FE1',
  color: '#fff',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  padding: '14px',
  borderRadius: '8px',
  marginTop: '8px',
  lineHeight: 1,
  '&:hover': {
    backgroundColor: '#4a4bc7',
  },
});

const FooterText = styled(Typography)({
  fontSize: '14px',
  color: '#666',
  textAlign: 'center',
  marginTop: '8px',
});

const StyledLink = styled(Link)({
  color: '#5E5FE1',
  textDecoration: 'none',
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default function SignUpForm({ onSubmit, onToggleMode, onClose }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if fields are empty
    if (!email || !password || !repeatPassword) {
      alert('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check if email already exists
    if (VALID_EMAILS.includes(email.toLowerCase().trim())) {
      alert('This email is already registered. Please sign in or use a different email.');
      return;
    }

    // Check if passwords match
    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    // Check password length
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // All validations passed
    onSubmit();
  };

  return (
    <FormWrapper>
      <CloseButton onClick={onClose} size="small">
        <CloseIcon fontSize="small" />
      </CloseButton>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <Box>
            <IconContainer>
              <IconCircle>
                <StyledLoginIcon />
              </IconCircle>
            </IconContainer>
            <FormTitle>Create an account to continue</FormTitle>
            <FormSubtitle>Create an account to access all the features on this app</FormSubtitle>
          </Box>

        <InputGroup>
          <InputLabel>Email or username</InputLabel>
          <StyledTextField
            fullWidth
            type="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <StyledTextField
            fullWidth
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Repeat password</InputLabel>
          <StyledTextField
            fullWidth
            type="password"
            placeholder="Enter your password again"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </InputGroup>

        <SubmitButton type="submit" variant="contained" fullWidth>
          Sign Up
        </SubmitButton>

        <FooterText>
          Already have an account?{' '}
          <StyledLink onClick={onToggleMode}>
            Sign In
          </StyledLink>
        </FooterText>
        </FormContainer>
      </form>
    </FormWrapper>
  );
}

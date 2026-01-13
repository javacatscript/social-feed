'use client';

// React/nextjs
import { useState } from 'react';
import Link from 'next/link';

// MUI
import { Box, TextField, Button, Typography, Link as MuiLink, styled } from '@mui/material';

// Components
import AuthCard from '@/components/AuthCard/AuthCard';

// Styled Components
const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
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
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
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
  color: '#666',
  fontSize: '14px',
  textAlign: 'center',
  marginTop: '8px',
});

const StyledLink = styled(MuiLink)<{ component?: React.ElementType; href?: string }>({
  color: '#5E5FE1',
  textDecoration: 'none',
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  return (
    <AuthCard
      title="Sign in to continue"
      subtitle="Sign in to access all the features on this app"
    >
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <InputGroup>
            <InputLabel variant="body2">
              Email or Username
            </InputLabel>
            <StyledTextField
              fullWidth
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
          </InputGroup>

          <InputGroup>
            <InputLabel variant="body2">
              Password
            </InputLabel>
            <StyledTextField
              fullWidth
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
          </InputGroup>

          <SubmitButton type="submit" variant="contained" fullWidth>
            Sign In
          </SubmitButton>

          <FooterText variant="body2">
            Do not have and account?{' '}
            <StyledLink component={Link} href="/signup">
              Sign Up
            </StyledLink>
          </FooterText>
        </FormContainer>
      </form>
    </AuthCard>
  );
}

'use client';

// React
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// MUI
import { Box, TextField, Button, Typography, styled, Link } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

const VALID_CREDENTIALS = [
  { email: 'demo@example.com', password: 'password123' },
  { email: 'test@user.com', password: 'testpass' },
];

// Styled Components
const PageContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  padding: '24px',
});

const FormCard = styled(Box)({
  width: '100%',
  maxWidth: 420,
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
  padding: '24px 40px',
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if fields are empty
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // Validate credentials
    const validUser = VALID_CREDENTIALS.find(
      (cred) => cred.email === email.toLowerCase().trim() && cred.password === password
    );

    if (validUser) {
      // Redirect to homepage on successful login
      router.push('/');
    } else {
      // Check if email exists but password is wrong
      const emailExists = VALID_CREDENTIALS.find(
        (cred) => cred.email === email.toLowerCase().trim()
      );
      
      if (emailExists) {
        alert('Incorrect password. Please try again.');
      } else {
        alert('Invalid email or password. Please check your credentials and try again.');
      }
    }
  };

  return (
    <PageContainer>
      <FormCard>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <Box>
              <IconContainer>
                <IconCircle>
                  <StyledLoginIcon />
                </IconCircle>
              </IconContainer>
              <FormTitle>Sign in to continue</FormTitle>
              <FormSubtitle>Sign in to access all the features on this app</FormSubtitle>
            </Box>

            <InputGroup>
              <InputLabel>Email or username</InputLabel>
              <StyledTextField
                fullWidth
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

            <SubmitButton type="submit" variant="contained" fullWidth>
              Sign In
            </SubmitButton>

            <FooterText>
              Do not have an account?{' '}
              <StyledLink href="/signup">
                Sign Up
              </StyledLink>
            </FooterText>
          </FormContainer>
        </form>
      </FormCard>
    </PageContainer>
  );
}

'use client';

// MUI
import { AppBar, Toolbar, Typography, Button, Box, styled } from '@mui/material';

// Icons
import { Logout as LogoutIcon, Login as LoginIcon } from '@mui/icons-material';

interface HeaderProps {
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

// Styled Components
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
});

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
  padding: '12px 24px',
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const AppName = styled(Typography)({
  fontWeight: 600,
  fontSize: '18px',
  color: '#000',
});

const AuthButton = styled(Button)({
  color: '#000',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  padding: '8px 16px',
  backgroundColor: 'transparent',
  border: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiButton-endIcon': {
    marginLeft: '8px',
  },
});

export default function Header({ isAuthenticated, onAuthClick }: HeaderProps) {
  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <LogoContainer>
          <AppName variant="h5">Atlys Social</AppName>
        </LogoContainer>
        <AuthButton
          disableRipple
          onClick={onAuthClick}
          endIcon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </AuthButton>
      </StyledToolbar>
    </StyledAppBar>
  );
}

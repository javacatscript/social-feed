'use client';

// MUI
import { Box, Card, CardContent, Typography, styled } from '@mui/material';

// Icons
import { Login as LoginIcon } from '@mui/icons-material';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

// Styled Components
const PageContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  padding: '16px',
});

const AuthCardContainer = styled(Card)({
  maxWidth: 420,
  width: '100%',
  borderRadius: '24px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
});

const CardInnerContent = styled(CardContent)({
  padding: '24px',
});

const IconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '24px',
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

const PageTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: '8px',
  fontSize: '20px',
  color: '#000',
  textAlign: 'center',
});

const PageSubtitle = styled(Typography)({
  color: '#666',
  marginBottom: '32px',
  fontSize: '14px',
  textAlign: 'center',
});

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <PageContainer>
      <AuthCardContainer>
        <CardInnerContent>
          <IconContainer>
            <IconCircle>
              <StyledLoginIcon />
            </IconCircle>
          </IconContainer>

          <PageTitle variant="h5">
            {title}
          </PageTitle>
          <PageSubtitle variant="body2">
            {subtitle}
          </PageSubtitle>

          {children}
        </CardInnerContent>
      </AuthCardContainer>
    </PageContainer>
  );
}

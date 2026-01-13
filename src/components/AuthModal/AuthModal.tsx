'use client';

// React
import { useState, useEffect } from 'react';

// MUI
import { Modal, Box, styled } from '@mui/material';

// Components
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
}

// Styled Components
const BackdropOverlay = styled(Box)({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 420,
  perspective: '1000px',
  outline: 'none',
});

interface CardInnerProps {
  $isFlipped: boolean;
}

const CardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isFlipped',
})<CardInnerProps>(({ $isFlipped }) => ({
  position: 'relative',
  width: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
  transform: $isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const CardFace = styled(Box)({
  position: 'relative',
  width: '100%',
  backfaceVisibility: 'hidden',
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
  padding: '24px 40px',
});

const CardFront = styled(CardFace)({
  transform: 'rotateY(0deg)',
});

const CardBack = styled(CardFace)({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'rotateY(180deg)',
});

export default function AuthModal({ open, onClose, onAuthenticate }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (open) {
      setMode('login');
      setIsFlipped(false);
    }
  }, [open]);

  const handleToggleMode = () => {
    setIsFlipped(!isFlipped);
    // Wait for animation to be halfway done before switching content
    setTimeout(() => {
      setMode(mode === 'login' ? 'signup' : 'login');
    }, 300);
  };

  const handleAuth = () => {
    onAuthenticate();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} BackdropComponent={BackdropOverlay}>
      <ModalContainer>
        <CardInner $isFlipped={isFlipped}>
          <CardFront>
            {mode === 'login' ? (
              <LoginForm onSubmit={handleAuth} onToggleMode={handleToggleMode} onClose={onClose} />
            ) : (
              <SignUpForm onSubmit={handleAuth} onToggleMode={handleToggleMode} onClose={onClose} />
            )}
          </CardFront>
          <CardBack>
            {mode === 'signup' ? (
              <SignUpForm onSubmit={handleAuth} onToggleMode={handleToggleMode} onClose={onClose} />
            ) : (
              <LoginForm onSubmit={handleAuth} onToggleMode={handleToggleMode} onClose={onClose} />
            )}
          </CardBack>
        </CardInner>
      </ModalContainer>
    </Modal>
  );
}

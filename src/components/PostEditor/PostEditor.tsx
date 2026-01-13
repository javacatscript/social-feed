'use client';

// React
import { useState } from 'react';

// MUI
import { Box, IconButton, Button, styled, keyframes } from '@mui/material';

// Icons
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Code,
  FormatQuote,
  Delete,
  SentimentSatisfiedAlt,
  AttachFile,
  Image as ImageIcon,
  Send,
} from '@mui/icons-material';

interface PostEditorProps {
  value: string;
  onChange: (value: string) => void;
  onPublish: (content: string) => void;
  onAuthRequired: () => void;
  isAuthenticated: boolean;
}

// keyframe animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`;

// Styled Components
const EditorContainer = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '24px',
  padding: '16px',
  paddingBottom: '0',
  marginBottom: '24px',
  border: '6px solid #F2F0EF',
});

const ToolbarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px',
});

const ToolbarLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: '#F2F0EF',
  borderRadius: '8px',
});

const ToolbarDivider = styled('span')({
  width: '1px',
  height: '24px',
  backgroundColor: '#D6D3D1',
  margin: '0 4px',
  display: 'inline-block',
});

const ToolbarButton = styled(IconButton)({
  padding: '8px',
  color: '#666',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#000',
  },
  '&.animate-shake': {
    animation: `${shake} 0.3s ease-in-out`,
  },
});

const DeleteButton = styled(IconButton)({
  padding: '8px',
  color: '#f44336',
  backgroundColor: '#ffebee',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#ffcdd2',
  },
  '&.animate-shake': {
    animation: `${shake} 0.3s ease-in-out`,
  },
});

const EditorTextArea = styled('textarea')({
  width: '100%',
  minHeight: '100px',
  border: 'none',
  outline: 'none',
  fontSize: '14px',
  fontFamily: 'inherit',
  resize: 'vertical',
  color: '#000',
  '&::placeholder': {
    color: '#999',
  },
});

const EditorFooter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '12px',
  borderTop: '1px solid #e0e0e0',
});

const FooterActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const PublishButton = styled(Button)({
  backgroundColor: 'transparent',
  color: '#5E5FE1',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '10px',
  borderRadius: '8px',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#4a4bc7',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    backgroundColor: 'transparent',
  },
});

export default function PostEditor({ value, onChange, onPublish, onAuthRequired, isAuthenticated }: PostEditorProps) {
  const [shakingButton, setShakingButton] = useState<string | null>(null);

  const handleNotImplemented = (buttonId: string) => {
    setShakingButton(buttonId);
    setTimeout(() => setShakingButton(null), 300);
    
    // show a  notification instead of alert
    const notification = document.createElement('div');
    notification.textContent = '✨ Coming soon!';
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #5E5FE1;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(notification);
        document.head.removeChild(style);
      }, 300);
    }, 2000);
  };

  const handlePublish = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    if (value.trim()) {
      onPublish(value);
      onChange('');
    }
  };

  return (
    <EditorContainer>
      <ToolbarContainer>
        <ToolbarLeft>
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('bold')}
            className={shakingButton === 'bold' ? 'animate-shake' : ''}
          >
            <FormatBold fontSize="small" />
          </ToolbarButton>
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('italic')}
            className={shakingButton === 'italic' ? 'animate-shake' : ''}
          >
            <FormatItalic fontSize="small" />
          </ToolbarButton>
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('underline')}
            className={shakingButton === 'underline' ? 'animate-shake' : ''}
          >
            <FormatUnderlined fontSize="small" />
          </ToolbarButton>
            <ToolbarDivider aria-hidden="true" />
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('bullet')}
            className={shakingButton === 'bullet' ? 'animate-shake' : ''}
          >
            <FormatListBulleted fontSize="small" />
          </ToolbarButton>
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('numbered')}
            className={shakingButton === 'numbered' ? 'animate-shake' : ''}
          >
            <FormatListNumbered fontSize="small" />
          </ToolbarButton>
            <ToolbarDivider aria-hidden="true" />
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('code')}
            className={shakingButton === 'code' ? 'animate-shake' : ''}
          >
            <Code fontSize="small" />
          </ToolbarButton>
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('quote')}
            className={shakingButton === 'quote' ? 'animate-shake' : ''}
          >
            <FormatQuote fontSize="small" />
          </ToolbarButton>
        </ToolbarLeft>
        <DeleteButton 
          size="small" 
          onClick={() => handleNotImplemented('delete')}
          className={shakingButton === 'delete' ? 'animate-shake' : ''}
        >
          <Delete fontSize="small" />
        </DeleteButton>
      </ToolbarContainer>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <SentimentSatisfiedAlt sx={{ color: '#666' }} />
        <EditorTextArea
          placeholder="How are you feeling today?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>

      <EditorFooter>
        <FooterActions>
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('attach')}
            className={shakingButton === 'attach' ? 'animate-shake' : ''}
          >
            <AttachFile fontSize="small" />
          </ToolbarButton>
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('image')}
            className={shakingButton === 'image' ? 'animate-shake' : ''}
          >
            <ImageIcon fontSize="small" />
          </ToolbarButton>
          <ToolbarButton 
            size="small" 
            onClick={() => handleNotImplemented('emoji')}
            className={shakingButton === 'emoji' ? 'animate-shake' : ''}
          >
            <SentimentSatisfiedAlt fontSize="small" />
          </ToolbarButton>
        </FooterActions>
        <PublishButton
          variant="contained"
          onClick={handlePublish}
          disabled={!value.trim()}
        >
          <Send />
        </PublishButton>
      </EditorFooter>
    </EditorContainer>
  );
}

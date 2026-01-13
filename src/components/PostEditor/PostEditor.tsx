'use client';

// React
import { useState } from 'react';

// MUI
import { Box, IconButton, Button, styled } from '@mui/material';

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

// Styled Components
const EditorContainer = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  padding: '16px',
  marginBottom: '24px',
});

const ToolbarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '12px',
  borderBottom: '1px solid #e0e0e0',
  marginBottom: '12px',
});

const ToolbarLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const ToolbarButton = styled(IconButton)({
  padding: '8px',
  color: '#666',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#000',
  },
});

const DeleteButton = styled(IconButton)({
  padding: '8px',
  color: '#f44336',
  backgroundColor: '#ffebee',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#ffcdd2',
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
  const handleNotImplemented = () => {
    alert('Function not implemented');
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
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <FormatBold fontSize="small" />
          </ToolbarButton>
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <FormatItalic fontSize="small" />
          </ToolbarButton>
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <FormatUnderlined fontSize="small" />
          </ToolbarButton>
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <FormatListBulleted fontSize="small" />
          </ToolbarButton>
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <FormatListNumbered fontSize="small" />
          </ToolbarButton>
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <Code fontSize="small" />
          </ToolbarButton>
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <FormatQuote fontSize="small" />
          </ToolbarButton>
        </ToolbarLeft>
        <DeleteButton size="small" onClick={handleNotImplemented}>
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
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <AttachFile fontSize="small" />
          </ToolbarButton>
          <ToolbarButton size="small" onClick={handleNotImplemented}>
            <ImageIcon fontSize="small" />
          </ToolbarButton>
          <ToolbarButton size="small" onClick={handleNotImplemented}>
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

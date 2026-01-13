'use client';

// React
import { useState } from 'react';

// MUI
import { Box, Avatar, Typography, IconButton, styled, keyframes } from '@mui/material';

// Icons
import { FavoriteBorder, ChatBubbleOutline, Send } from '@mui/icons-material';

export interface Post {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  emoji?: string;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
  onInteraction: () => void;
  isAuthenticated: boolean;
}

// Keyframe Animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`;

const heartBeat = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

// Styled Components
const CardContainer = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  padding: '16px',
  paddingBottom: '12px',
  marginBottom: '16px',
});

const PostHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const UserAvatar = styled(Avatar)({
  width: 44,
  height: 44,
  marginRight: '12px',
  '& img': {
    objectFit: 'contain',
    padding: '4px',
  },
});

const UserInfo = styled(Box)({
  flex: 1,
});

const UserName = styled(Typography)({
  fontWeight: 600,
  fontSize: '14px',
  color: '#000',
  marginBottom: '2px',
});

const PostTime = styled(Typography)({
  fontSize: '12px',
  color: '#999',
});

const PostContent = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginBottom: '16px',
});

const PostEmoji = styled('span')({
  fontSize: '20px',
  flexShrink: 0,
});

const PostText = styled(Typography)({
  fontSize: '14px',
  color: '#333',
  lineHeight: '1.6',
  wordBreak: 'break-word',
});

const PostActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const ActionButton = styled(IconButton)({
  padding: '8px',
  color: '#666',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#5E5FE1',
  },
  '&.animate-shake': {
    animation: `${shake} 0.3s ease-in-out`,
  },
  '&.animate-heartbeat': {
    animation: `${heartBeat} 0.5s ease-in-out`,
  },
});

export default function PostCard({ post, onInteraction, isAuthenticated }: PostCardProps) {
  const [animatingButton, setAnimatingButton] = useState<string | null>(null);

  const handleAction = (buttonId: string) => {
    if (!isAuthenticated) {
      onInteraction();
    } else {
      // determine animation based on button type
      const animationType = buttonId === 'like' ? 'animate-heartbeat' : 'animate-shake';
      setAnimatingButton(`${buttonId}-${animationType}`);
      setTimeout(() => setAnimatingButton(null), animationType === 'animate-heartbeat' ? 500 : 300);
      
      // show a notification instead of alert
      const notification = document.createElement('div');
      const messages = {
        like: '❤️ Like feature coming soon!',
        comment: '💬 Comment feature coming soon!',
        share: '📤 Share feature coming soon!',
      };
      notification.textContent = messages[buttonId as keyof typeof messages] || '✨ Coming soon!';
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
    }
  };

  return (
    <CardContainer>
      <PostHeader>
        <UserAvatar src={post.avatar} alt={post.author} />
        <UserInfo>
          <UserName>{post.author}</UserName>
          <PostTime>{post.timestamp}</PostTime>
        </UserInfo>
      </PostHeader>

      <PostContent>
        {post.emoji && <PostEmoji>{post.emoji}</PostEmoji>}
        <PostText>{post.content}</PostText>
      </PostContent>

      <PostActions>
        <ActionButton 
          size="small" 
          onClick={() => handleAction('like')}
          className={animatingButton === 'like-animate-heartbeat' ? 'animate-heartbeat' : ''}
        >
          <FavoriteBorder fontSize="small" />
        </ActionButton>
        <ActionButton 
          size="small" 
          onClick={() => handleAction('comment')}
          className={animatingButton === 'comment-animate-shake' ? 'animate-shake' : ''}
        >
          <ChatBubbleOutline fontSize="small" />
        </ActionButton>
        <ActionButton 
          size="small" 
          onClick={() => handleAction('share')}
          className={animatingButton === 'share-animate-shake' ? 'animate-shake' : ''}
        >
          <Send fontSize="small" />
        </ActionButton>
      </PostActions>
    </CardContainer>
  );
}

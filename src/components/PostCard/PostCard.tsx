'use client';

// MUI
import { Box, Avatar, Typography, IconButton, styled } from '@mui/material';

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
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#5E5FE1',
  },
});

export default function PostCard({ post, onInteraction, isAuthenticated }: PostCardProps) {
  const handleAction = () => {
    if (!isAuthenticated) {
      onInteraction();
    } else {
      alert('Function not implemented');
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
        <ActionButton size="small" onClick={handleAction}>
          <FavoriteBorder fontSize="small" />
        </ActionButton>
        <ActionButton size="small" onClick={handleAction}>
          <ChatBubbleOutline fontSize="small" />
        </ActionButton>
        <ActionButton size="small" onClick={handleAction}>
          <Send fontSize="small" />
        </ActionButton>
      </PostActions>
    </CardContainer>
  );
}

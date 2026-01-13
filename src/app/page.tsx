'use client';

// React
import { useState } from 'react';

// MUI
import { Box, Container, styled } from '@mui/material';

// Components
import Header from '@/components/Header/Header';
import PostEditor from '@/components/PostEditor/PostEditor';
import PostCard, { Post } from '@/components/PostCard/PostCard';
import AuthModal from '@/components/AuthModal/AuthModal';

// Styled Components
const PageContainer = styled(Box)({
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
});

const FeedContainer = styled(Container)(({ theme }) => ({
  maxWidth: '600px',
  paddingTop: '32px',
  paddingBottom: '32px',
  [theme.breakpoints.up(1200)]: {
    maxWidth: '768px',
  },
}));

const AVATAR_LIST = [
  '/avatar/baby-crocodile-head.svg',
  '/avatar/black-goat-head.svg',
  '/avatar/black-owl-head.svg',
  '/avatar/cow-head.svg',
  '/avatar/cute-fox-head.svg',
  '/avatar/rabbit-head.svg',
  '/avatar/white-cat-head.svg',
];

const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    author: 'Rupank',
    avatar: '/avatar/black-goat-head.svg',
    content: `Hi, I'm Rupank, a Software Engineer with around 3 YoE aimed at delivering intuitive UIs, seamless UX, eliminating unnecessary complexities, making apps faster and easier to use/code. I'm adept at React, Next.js, Ionic, Javascript/Typescript, Redux, MUI, Sass, and have some experience with Java, Php, and MySql. I'm always trying to make better tech, one commit at a time!`,
    emoji: '😊',
    timestamp: '11 mins ago',
  },
  {
    id: '2',
    author: 'Peter Parker',
    avatar: '/avatar/cute-fox-head.svg',
    content:
      "This is Peter Parker your friendly neighbourhood Spiderman, a curious, soft-spoken photographer with a knack for being in the right place at the wrong time. I balance my time between studying, freelancing, and figuring life out one step at a time. I enjoy science, honest conversations, and capturing real moments through my camera. I believe with great power comes great responsibility.",
    emoji: '👍',
    timestamp: '33 mins ago',
  },
  {
    id: '3',
    author: 'Mary Jane',
    avatar: '/avatar/rabbit-head.svg',
    content:
      "Hey there, I'm MJ! I love creative chaos, late-night ideas, and doing things that feel exciting (even if they scare me a little). I'm big on self-expression, good energy, and people who keep it real. I believe life's better when you take chances, laugh often, and don't overthink everything.",
    emoji: '💀',
    timestamp: '47 mins ago',
  },
];

export default function FeedPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS);
  const [postContent, setPostContent] = useState('');

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  const handlePublishPost = (content: string) => {
    // pick a random avatar forr new users
    const randomAvatar = AVATAR_LIST[Math.floor(Math.random() * AVATAR_LIST.length)];
    
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'Current User',
      avatar: randomAvatar,
      content,
      timestamp: 'Just now',
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <PageContainer>
      <Header isAuthenticated={isAuthenticated} onAuthClick={handleAuthClick} />
      
      <FeedContainer>
        <PostEditor
          value={postContent}
          onChange={setPostContent}
          onPublish={handlePublishPost}
          onAuthRequired={handleAuthRequired}
          isAuthenticated={isAuthenticated}
        />

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onInteraction={handleAuthRequired}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </FeedContainer>

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticate={handleAuthenticate}
      />
    </PageContainer>
  );
}

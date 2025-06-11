import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarImage, AvatarFallback } from '../components/shared/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar uses design tokens for size, border, and fallback color. Supports image, initials, and fallback icon. Ensures minimum size for accessibility.'
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: { description: { story: 'Avatar with image and initials fallback.' } }
  }
};

export const FallbackOnly: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>CD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: { description: { story: 'Avatar with initials fallback only.' } }
  }
};

export const FallbackIcon: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="User icon" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="var(--color-muted)" />
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="var(--color-border)" />
        </svg>
      </AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: { description: { story: 'Avatar with fallback icon (SVG).' } }
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Avatar style={{ width: 32, height: 32 }}>
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar style={{ width: 48, height: 48 }}>
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar style={{ width: 64, height: 64 }}>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar style={{ width: 96, height: 96 }}>
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Avatar in extra small, small, medium, and large sizes.' } }
  }
}; 
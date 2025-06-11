import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/shared/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Avatar>
        <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
    </div>
  ),
}; 
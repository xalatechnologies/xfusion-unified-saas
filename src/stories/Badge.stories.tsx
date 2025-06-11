import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/shared/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Shared/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const Default: Story = {
  args: { children: 'Default' },
};
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};
export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};
export const WithToken: Story = {
  args: {
    children: 'Token',
    style: { background: 'var(--color-accent)', color: 'var(--color-surface)' },
  },
}; 
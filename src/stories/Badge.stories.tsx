import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../components/shared/Badge';

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

export const Default: Story = { args: { children: 'Default' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Destructive' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } };
export const Success: Story = { args: { variant: 'success', children: 'Success' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } };
export const Info: Story = { args: { variant: 'info', children: 'Info' } };
export const Accent: Story = { args: { variant: 'accent', children: 'Accent' } };
export const Muted: Story = { args: { variant: 'muted', children: 'Muted' } };
export const Card: Story = { args: { variant: 'card', children: 'Card' } };

export const PillShape: Story = { args: { children: 'Pill Shape', shape: 'pill' } };
export const RoundedShape: Story = { args: { children: 'Rounded Shape', shape: 'rounded' } };

export const StatusRole: Story = {
  args: { children: 'Status', role: 'status', variant: 'info' },
  parameters: {
    docs: {
      description: {
        story: 'Badge with ARIA role="status" for screen reader announcement.'
      }
    }
  }
};

export const InteractiveWarning: Story = {
  render: () => (
    <button className="min-w-[44px] min-h-[44px]">
      <Badge variant="success">Interactive</Badge>
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'If you remove min-w-[44px] min-h-[44px] from the button, a runtime warning will appear in development.'
      }
    }
  }
}; 
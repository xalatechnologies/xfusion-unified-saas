import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '../components/shared/Separator';

const meta: Meta<typeof Separator> = {
  title: 'Shared/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Separator orientation="horizontal" />
    </div>
  ),
};
export const Vertical: Story = {
  render: () => (
    <div style={{ height: 60, display: 'flex', alignItems: 'center' }}>
      <Separator orientation="vertical" />
    </div>
  ),
}; 
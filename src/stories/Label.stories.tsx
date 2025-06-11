import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/shared/Label';

const meta: Meta<typeof Label> = {
  title: 'Shared/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Label>;

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Label>Default Label</Label>
      <Label>Label <span style={{ color: 'var(--color-error)' }}>*</span></Label>
      <Label aria-disabled>Disabled Label</Label>
    </div>
  ),
}; 
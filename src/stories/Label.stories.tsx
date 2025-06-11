import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../components/shared/Label';

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

export const Default: Story = { args: { children: 'Default Label' } };
export const WithAsterisk: Story = {
  render: () => (
    <Label>
      Label <span style={{ color: 'var(--color-error)' }}>*</span>
    </Label>
  ),
};
export const Disabled: Story = { args: { children: 'Disabled Label', 'aria-disabled': true } }; 
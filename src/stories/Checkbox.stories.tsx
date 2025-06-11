import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@/components/shared/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Shared/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox />
      <Checkbox checked />
      <Checkbox disabled />
    </div>
  ),
}; 
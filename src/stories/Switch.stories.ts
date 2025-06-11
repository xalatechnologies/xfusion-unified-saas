import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '@/components/shared/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Shared/Switch',
  component: Switch,
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
type Story = StoryObj<typeof Switch>;

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch />
      <Switch checked />
      <Switch disabled />
    </div>
  ),
}; 
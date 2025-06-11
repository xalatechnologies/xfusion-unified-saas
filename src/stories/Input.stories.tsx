import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/shared/Input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Type here...',
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Input placeholder="Default" />
      <Input placeholder="With placeholder" />
      <Input disabled placeholder="Disabled input" />
      {/* For icon usage, wrap Input in a flex container and use a left icon as a child */}
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 12, top: 10, color: 'var(--color-muted)' }}>🔍</span>
        <Input style={{ paddingLeft: 32 }} placeholder="With icon" />
      </div>
    </div>
  ),
}; 
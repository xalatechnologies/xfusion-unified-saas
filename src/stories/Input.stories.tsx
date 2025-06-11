import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components/shared/Input';

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

export const Default: Story = {};
export const WithPlaceholder: Story = { args: { placeholder: 'With placeholder' } };
export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled input' } };
export const WithIcon: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 300 }}>
      <span style={{ position: 'absolute', left: 12, top: 10, color: 'var(--color-muted)' }}>🔍</span>
      <Input style={{ paddingLeft: 32 }} placeholder="With icon" />
    </div>
  ),
}; 
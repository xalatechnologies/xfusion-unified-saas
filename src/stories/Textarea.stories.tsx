import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '@/components/shared/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Type your message...',
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
      <Textarea placeholder="Default" />
      <Textarea placeholder="With placeholder" />
      <Textarea disabled placeholder="Disabled textarea" />
    </div>
  ),
}; 
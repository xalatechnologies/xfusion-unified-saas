import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../components/shared/Textarea';

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

export const Default: Story = {};
export const WithPlaceholder: Story = { args: { placeholder: 'With placeholder' } };
export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled textarea' } }; 
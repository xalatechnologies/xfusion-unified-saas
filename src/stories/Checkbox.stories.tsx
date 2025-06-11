import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../components/shared/Checkbox';

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

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } }; 
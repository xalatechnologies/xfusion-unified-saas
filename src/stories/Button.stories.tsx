import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FiPlus } from 'react-icons/fi';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import { Button } from '../components/shared/Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'gradient', 'whiteBlur', 'secondary', 'outline', 'destructive', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
export const Primary: Story = { args: { variant: 'primary' } };
export const Gradient: Story = { args: { variant: 'gradient' } };
export const WhiteBlur: Story = { args: { variant: 'whiteBlur' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Link: Story = { args: { variant: 'link' } };
export const Small: Story = { args: { size: 'sm', children: 'Small' } };
export const Large: Story = { args: { size: 'lg', children: 'Large' } };
export const Icon: Story = {
  args: {
    size: 'icon',
    'aria-label': 'Add',
    children: <FiPlus />,
  },
};
export const Disabled: Story = { args: { disabled: true, children: 'Disabled' } };

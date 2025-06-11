import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FiPlus } from 'react-icons/fi';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import { Button } from '@/components/shared/Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'],
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
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="gradient">Gradient</Button>
      <Button variant="whiteBlur">White Blur</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <FiPlus />
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

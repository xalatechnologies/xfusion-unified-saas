import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '../components/shared/Separator';

const meta: Meta<typeof Separator> = {
  title: 'Shared/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Separator uses design tokens for color and thickness. Ensures sufficient contrast for all backgrounds.'
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Separator orientation="horizontal" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Horizontal separator using tokenized color and thickness.' } }
  }
};

export const Vertical: Story = {
  render: () => (
    <div style={{ height: 60, display: 'flex', alignItems: 'center' }}>
      <Separator orientation="vertical" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Vertical separator using tokenized color and thickness.' } }
  }
};

export const HorizontalOnDark: Story = {
  render: () => (
    <div style={{ width: 200, background: '#1e293b', padding: 16 }}>
      <Separator orientation="horizontal" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Horizontal separator on dark background. Ensures sufficient contrast.' } }
  }
};

export const VerticalOnDark: Story = {
  render: () => (
    <div style={{ height: 60, display: 'flex', alignItems: 'center', background: '#1e293b', padding: 16 }}>
      <Separator orientation="vertical" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Vertical separator on dark background. Ensures sufficient contrast.' } }
  }
}; 
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const meta: Meta<typeof Label> = {
  title: 'Shared/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Label uses design tokens for font size, weight, and color. Always associate with input/textarea via htmlFor/id for accessibility.'
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = { args: { children: 'Default Label' } };
export const Required: Story = {
  render: () => (
    <Label>
      Label <span style={{ color: 'var(--color-error)' }}>*</span>
    </Label>
  ),
  parameters: {
    docs: { description: { story: 'Use an asterisk for required fields.' } }
  }
};
export const Disabled: Story = { args: { children: 'Disabled Label', 'aria-disabled': true } };

export const AssociatedWithInput: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" placeholder="user@example.com" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Label is associated with input via htmlFor/id.' } }
  }
};

export const AssociatedWithTextarea: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself..." />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Label is associated with textarea via htmlFor/id.' } }
  }
};

export const FocusedInput: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="focus-demo">Focus Demo</Label>
      <Input id="focus-demo" placeholder="Focus me to see outline" autoFocus />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'When the input is focused, a visible outline appears for accessibility.' } }
  }
}; 
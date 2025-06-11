import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Checkbox> = {
  title: 'Shared/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox uses design tokens for color, border, and radii. Enforces min 44x44px for accessibility. Use Label for association.'
      }
    }
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

export const Indeterminate: Story = {
  render: () => <Checkbox checked="indeterminate" aria-checked="mixed" />,
  parameters: {
    docs: { description: { story: 'Indeterminate state for partial selection.' } }
  }
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept Terms & Conditions</Label>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Checkbox is associated with Label via htmlFor/id.' } }
  }
};

export const Focused: Story = {
  render: () => <Checkbox autoFocus />,
  parameters: {
    docs: { description: { story: 'When the checkbox is focused, a visible outline appears for accessibility.' } }
  }
};

export const LargeClickableArea: Story = {
  render: () => (
    <div style={{ padding: 16, background: '#f9fafb', display: 'inline-block' }}>
      <Checkbox style={{ minWidth: 44, minHeight: 44 }} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Checkbox enforces a minimum 44x44px clickable area for accessibility.' } }
  }
}; 
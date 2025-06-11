import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Switch> = {
  title: 'Shared/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Switch uses design tokens for color, border, and radii. Enforces min 44x44px for accessibility. Use Label for association.'
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
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable Notifications</Label>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Switch is associated with Label via htmlFor/id.' } }
  }
};

export const Focused: Story = {
  render: () => <Switch autoFocus />,
  parameters: {
    docs: { description: { story: 'When the switch is focused, a visible outline appears for accessibility.' } }
  }
};

export const LargeClickableArea: Story = {
  render: () => (
    <div style={{ padding: 16, background: '#f9fafb', display: 'inline-block' }}>
      <Switch style={{ minWidth: 44, minHeight: 44 }} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Switch enforces a minimum 44x44px clickable area for accessibility.' } }
  }
}; 
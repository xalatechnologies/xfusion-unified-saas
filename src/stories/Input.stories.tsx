import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components/shared/Input';
import { Label } from '../components/shared/Label';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input uses design tokens for background, border, radii, and typography. Always associate with Label via htmlFor/id for accessibility. Use aria-describedby for help/error text.'
      }
    }
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

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" placeholder="user@example.com" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Input is associated with Label via htmlFor/id.' } }
  }
};

export const WithHelpText: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="username">Username</Label>
      <Input id="username" aria-describedby="username-help" placeholder="Choose a username" />
      <p id="username-help" style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 4 }}>Must be unique and 4-20 characters.</p>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Help text is linked via aria-describedby.' } }
  }
};

export const WithErrorText: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="password">Password</Label>
      <Input id="password" aria-describedby="password-error" placeholder="Enter password" />
      <p id="password-error" style={{ fontSize: 12, color: 'var(--color-error)', marginTop: 4 }}>Password is required.</p>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Error text is linked via aria-describedby and uses error color.' } }
  }
};

export const Responsive: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <Label htmlFor="responsive">Responsive Input</Label>
      <Input id="responsive" placeholder="Try resizing the window" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Input is responsive and adapts to container width.' } }
  }
};

export const Focused: Story = {
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
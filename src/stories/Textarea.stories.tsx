import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../components/shared/Textarea';
import { Label } from '../components/shared/Label';

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Textarea uses design tokens for background, border, radii, and typography. Always associate with Label via htmlFor/id for accessibility. Use aria-describedby for help/error text.'
      }
    }
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

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself..." />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Textarea is associated with Label via htmlFor/id.' } }
  }
};

export const WithHelpText: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="about">About</Label>
      <Textarea id="about" aria-describedby="about-help" placeholder="Describe your experience" />
      <p id="about-help" style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 4 }}>Share your background and skills.</p>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Help text is linked via aria-describedby.' } }
  }
};

export const WithErrorText: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="feedback">Feedback</Label>
      <Textarea id="feedback" aria-describedby="feedback-error" placeholder="Enter feedback" />
      <p id="feedback-error" style={{ fontSize: 12, color: 'var(--color-error)', marginTop: 4 }}>Feedback is required.</p>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Error text is linked via aria-describedby and uses error color.' } }
  }
};

export const Responsive: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <Label htmlFor="responsive">Responsive Textarea</Label>
      <Textarea id="responsive" placeholder="Try resizing the window" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Textarea is responsive and adapts to container width.' } }
  }
};

export const Focused: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Label htmlFor="focus-demo">Focus Demo</Label>
      <Textarea id="focus-demo" placeholder="Focus me to see outline" autoFocus />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'When the textarea is focused, a visible outline appears for accessibility.' } }
  }
}; 
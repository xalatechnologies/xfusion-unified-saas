import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

// Accessibility notes:
// - All cards use only design tokens for color, border, shadow, and radii.
// - All variants have sufficient color contrast and visible focus for interactive content.
// - Fully responsive and accessible by keyboard and screen reader.

export const Default: Story = {
  render: () => (
    <Card style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>This is a default card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
};
export const Blue: Story = {
  render: () => (
    <Card variant="blue" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Blue Border</CardTitle>
      </CardHeader>
      <CardContent>Blue left border</CardContent>
    </Card>
  ),
};
export const Green: Story = {
  render: () => (
    <Card variant="green" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Green Border</CardTitle>
      </CardHeader>
      <CardContent>Green left border</CardContent>
    </Card>
  ),
};
export const Purple: Story = {
  render: () => (
    <Card variant="purple" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Purple Border</CardTitle>
      </CardHeader>
      <CardContent>Purple left border</CardContent>
    </Card>
  ),
};
export const Orange: Story = {
  render: () => (
    <Card variant="orange" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Orange Border</CardTitle>
      </CardHeader>
      <CardContent>Orange left border</CardContent>
    </Card>
  ),
};
export const Dashed: Story = {
  render: () => (
    <Card variant="dashed" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Dashed Border</CardTitle>
      </CardHeader>
      <CardContent>Dashed border style</CardContent>
    </Card>
  ),
};
export const Shadow: Story = {
  render: () => (
    <Card variant="shadow" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Shadow</CardTitle>
      </CardHeader>
      <CardContent>Extra shadow</CardContent>
    </Card>
  ),
};
export const Gradient: Story = {
  render: () => (
    <Card variant="gradient" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Gradient Background</CardTitle>
      </CardHeader>
      <CardContent>Gradient background style</CardContent>
    </Card>
  ),
};
export const Soft: Story = {
  render: () => (
    <Card variant="soft" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Soft Shadow</CardTitle>
      </CardHeader>
      <CardContent>Soft shadow and subtle background.</CardContent>
    </Card>
  ),
};
export const Glass: Story = {
  render: () => (
    <Card variant="glass" style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Glass/Blurred</CardTitle>
      </CardHeader>
      <CardContent>Glassmorphism effect with blur and transparency.</CardContent>
    </Card>
  ),
};
export const Layered: Story = {
  render: () => (
    <Card variant="layered" style={{ width: 400, position: 'relative' }}>
      <CardHeader>
        <CardTitle>Layered</CardTitle>
      </CardHeader>
      <CardContent>Layered background effect using tokens.</CardContent>
    </Card>
  ),
}; 
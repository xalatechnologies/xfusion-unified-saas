import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof Table> = {
  title: 'Shared/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Table uses design tokens for background, border, and typography. Supports zebra striping, sticky header, and is fully responsive and accessible.'
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Example table using design tokens</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jane Doe</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>
            <Badge variant="default">Active</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>John Smith</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>
            <Badge variant="destructive">Inactive</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} style={{ textAlign: 'right' }}>
            Total: 2 users
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  parameters: {
    docs: { description: { story: 'Default table with design tokens.' } }
  }
};

export const ZebraStriping: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(6)].map((_, i) => (
          <TableRow key={i} style={{ background: i % 2 === 1 ? 'var(--color-muted)' : 'var(--color-surface)' }}>
            <TableCell>User {i + 1}</TableCell>
            <TableCell>user{i + 1}@example.com</TableCell>
            <TableCell>
              <Badge variant={i % 2 === 0 ? 'default' : 'secondary'}>{i % 2 === 0 ? 'Active' : 'Inactive'}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: { description: { story: 'Table with zebra striping for readability.' } }
  }
};

export const StickyHeader: Story = {
  render: () => (
    <div style={{ maxHeight: 180, overflowY: 'auto', width: 400 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(12)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>User {i + 1}</TableCell>
              <TableCell>user{i + 1}@example.com</TableCell>
              <TableCell>
                <Badge variant={i % 2 === 0 ? 'default' : 'secondary'}>{i % 2 === 0 ? 'Active' : 'Inactive'}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Table with sticky header for better navigation in long lists.' } }
  }
};

export const Responsive: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 500 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Jane Doe</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>
              <Badge variant="default">Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>John Smith</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>
              <Badge variant="destructive">Inactive</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Table is responsive and adapts to container width.' } }
  }
}; 
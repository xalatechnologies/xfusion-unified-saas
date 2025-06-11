import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '../components/shared/Table';
import { Badge } from '../components/shared/Badge';

const meta: Meta<typeof Table> = {
  title: 'Shared/Table',
  component: Table,
  parameters: {
    layout: 'centered',
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
}; 
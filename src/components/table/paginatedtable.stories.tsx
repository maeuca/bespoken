import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PaginatedTable, type Column } from './PaginatedTable';

interface User {
  id: number;
  name: string;
  email: string;
}

const sampleData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com' },
  { id: 5, name: 'Edward Nigma', email: 'edward@example.com' },
  { id: 6, name: 'Fiona Glenanne', email: 'fiona@example.com' },
  { id: 7, name: 'George Bailey', email: 'george@example.com' },
  { id: 8, name: 'Hannah Baker', email: 'hannah@example.com' },
];

const columns: Column<User>[] = [
  { header: 'Name', accessor: 'name', sortable: true },
  { header: 'Email', accessor: 'email', sortable: true },
];

const meta: Meta<typeof PaginatedTable<User>> = {
  title: 'Components/PaginatedTable',
  component: PaginatedTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PaginatedTable<User>>;

export const Default: Story = {
  render: (args) => <PaginatedTable<User> {...args} />,
  args: {
    data: sampleData,
    columns,
    itemsPerPage: 4,
    title: 'User List',
    renderAddDialog: (close) => (
      <div style={{ background: '#eee', padding: '1rem' }}>
        <strong>Add Dialog</strong>
        <button onClick={close} style={{ marginLeft: '10px' }}>Close</button>
      </div>
    ),
    renderEditDialog: (row, close) => (
      <div style={{ background: '#eee', padding: '1rem' }}>
        <strong>Edit {row.name}</strong>
        <button onClick={close} style={{ marginLeft: '10px' }}>Close</button>
      </div>
    ),
    renderDeleteDialog: (row, close) => (
      <div style={{ background: '#eee', padding: '1rem' }}>
        <strong>Delete {row.name}?</strong>
        <button onClick={close} style={{ marginLeft: '10px' }}>Cancel</button>
      </div>
    ),
    renderFilterBar: () => (
      <input
        type="text"
        placeholder="Search..."
        style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    ),
  },
};

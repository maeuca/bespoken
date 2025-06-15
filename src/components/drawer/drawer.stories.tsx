import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, type DrawerItem } from './Drawer';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';


const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    items: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const mockItems: DrawerItem[] = [
  { label: 'Home', path: '/', icon: <FaHome /> },
  { label: 'Profile', path: '/profile', icon: <FaUser /> },
  { label: 'Settings', path: '/settings', icon: <FaCog /> },
];

export const ActiveHome: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="*" element={<Drawer {...args} />} />
      </Routes>
    </MemoryRouter>
  ),
  args: {
    title: 'Main Menu',
    items: mockItems,
  },
};

export const ActiveProfile: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={['/profile']}>
      <Routes>
        <Route path="*" element={<Drawer {...args} />} />
      </Routes>
    </MemoryRouter>
  ),
  args: {
    title: 'Main Menu',
    items: mockItems,
  },
};

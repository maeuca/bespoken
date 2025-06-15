import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Confirmation from './Confirmation';

const meta: Meta<typeof Confirmation> = {
  title: 'Components/Confirmation',
  component: Confirmation,
  tags: ['autodocs'],
  argTypes: {
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
};

export default meta;
type Story = StoryObj<typeof Confirmation>;

export const Default: Story = {
  args: {
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
  },
};

export const CustomLabels: Story = {
  args: {
    title: 'Leave Page',
    message: 'You have unsaved changes. Are you sure you want to leave?',
    confirmLabel: 'Leave Anyway',
    cancelLabel: 'Stay Here',
  },
};

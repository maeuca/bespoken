import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    submitting: { control: 'boolean' },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const WithFormFields: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '' });

    if (!visible) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirm = () => {
      args.onConfirm?.();
      console.log('Form Submitted:', formData);
    };

    return (
      <Dialog
        {...args}
        onCancel={() => {
          setVisible(false);
          args.onCancel?.();
        }}
        onConfirm={handleConfirm}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>
              Name:
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </label>
          </div>
        </div>
      </Dialog>
    );
  },
  args: {
    title: 'User Details',
    confirmLabel: 'Submit',
    cancelLabel: 'Cancel',
    submitting: false,
  },
};

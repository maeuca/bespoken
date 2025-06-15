import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateBox } from './Datebox';

const meta: Meta<typeof DateBox> = {
  title: 'Components/DateBox',
  component: DateBox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'date' },
    onChange: { action: 'date changed' },
  },
};

export default meta;
type Story = StoryObj<typeof DateBox>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || new Date().toISOString().split('T')[0]);

    return (
      <DateBox
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange?.(val);
        }}
      />
    );
  },
  args: {
    label: 'Select Date',
    value: new Date().toISOString().split('T')[0], // today's date in yyyy-mm-dd
  },
    parameters: {
        controls: {
        include: ['label', 'value'],
        },
    },
};

export const WithCustomLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || new Date().toISOString().split('T')[0]);

    return (
      <DateBox
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange?.(val);
        }}
      />
    );
  },
  args: {
    label: 'Custom Date Label',
    value: new Date().toISOString().split('T')[0], // today's date in yyyy-mm-dd
  },
};

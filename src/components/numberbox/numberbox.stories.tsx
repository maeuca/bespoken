import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberBox } from './NumberBox';

const meta: Meta<typeof NumberBox> = {
  title: 'Components/NumberBox',
  component: NumberBox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: { type: 'number' } },
    onChange: { action: 'value changed' },
  },
};

export default meta;
type Story = StoryObj<typeof NumberBox>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<number>(args.value ?? 0);

    return (
      <NumberBox
        {...args}
        value={value}
        onChange={(newVal) => {
          setValue(newVal);
          args.onChange?.(newVal);
        }}
      />
    );
  },
  args: {
    label: 'Enter a number',
    value: 42,
  },
};

export const WithCustomLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState<number>(args.value ?? 0);

    return (
      <NumberBox
        {...args}
        value={value}
        onChange={(newVal) => {
          setValue(newVal);
          args.onChange?.(newVal);
        }}
      />
    );
  },
  args: {
    label: 'Custom Number Input',
    value: 100,
  },
};
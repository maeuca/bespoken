import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextBox } from './Textbox';

const meta: Meta<typeof TextBox> = {
  title: 'Components/TextBox',
  component: TextBox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'value changed' },
  },
};

export default meta;
type Story = StoryObj<typeof TextBox>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');

    return (
      <TextBox
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
    label: 'Name',
    value: 'John Doe',
  },
};

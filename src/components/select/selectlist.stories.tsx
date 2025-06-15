import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectList } from './SelectList';

const meta: Meta<typeof SelectList> = {
  title: 'Components/SelectList',
  component: SelectList,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    selectedItem: { control: { type: 'number' } },
    onSelect: { action: 'item selected' },
    items: { control: false }, // we'll use a predefined list
  },
};

export default meta;
type Story = StoryObj<typeof SelectList>;

const sampleItems = [
  { id: 1, name: 'Option One' },
  { id: 2, name: 'Option Two' },
  { id: 3, name: 'Option Three' },
];

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedItem ?? sampleItems[0].id);

    return (
      <SelectList
        {...args}
        items={sampleItems}
        selectedItem={selected}
        onSelect={(id) => {
          setSelected(id);
          args.onSelect?.(id);
        }}
      />
    );
  },
  args: {
    label: 'Select an Option',
    selectedItem: 2,
  },
};

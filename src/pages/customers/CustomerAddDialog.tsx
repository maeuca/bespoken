import React, { useState } from 'react';
import { CustomersService } from '../../types/openapi/services/CustomersService';
import type { Customer } from '../../types/openapi/models/Customer';
import { TextBox } from '../../components/textbox/Textbox';
import { DateBox } from '../../components/date/Datebox';
import Dialog from '../../components/dialog/Dialog';

interface Props {
  onAdd: (newCustomer: Customer) => void;
  onClose: () => void;
  customers: Customer[];
}

export const CustomerAddDialog: React.FC<Props> = ({ onAdd, onClose, customers }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    const duplicate = customers.some(c =>
      (c.firstName ?? '').trim().toLowerCase() === firstName.trim().toLowerCase() &&
      (c.lastName ?? '').trim().toLowerCase() === lastName.trim().toLowerCase()
    );
    if (duplicate) {
      setError('A customer with this name already exists.');
      setSubmitting(false);
      return;
    }

    try {
      const newCustomer: Customer = {
        id: 0,
        firstName,
        lastName,
        address,
        phone,
        startDate,
      };

      const created = await CustomersService.postApiCustomers(newCustomer);
      onAdd(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to add customer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      title="New Customer"
      onConfirm={handleSubmit}
      onCancel={onClose}
      submitting={submitting}
    >
      <TextBox
        value={firstName}
        label="First Name"
        onChange={setFirstName}
      />

      <TextBox
        value={lastName}
        label="Last Name"
        onChange={setLastName}
      />

      <TextBox
        value={address}
        label="Address"
        onChange={setAddress}
      />

      <TextBox
        value={phone}
        label="Phone"
        onChange={setPhone}
      />

      <DateBox
        value={startDate}
        label="Start Date"
        onChange={setStartDate}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Dialog>
  );
};

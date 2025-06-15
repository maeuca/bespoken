import React, { useState } from 'react';
import { CustomersService } from '../../types/openapi/services/CustomersService';
import type { Customer } from '../../types/openapi/models/Customer';
import { DateBox } from '../../components/date/Datebox';
import { TextBox } from '../../components/textbox/Textbox';
import { Dialog } from '../../components/dialog/Dialog';

interface Props {
  customer: Customer;
  onUpdate: (updatedCustomer: Customer) => void;
  onClose: () => void;
}

const CustomerEditDialog: React.FC<Props> = ({ customer, onUpdate, onClose }) => {
  const [firstName, setFirstName] = useState(customer.firstName || '');
  const [lastName, setLastName] = useState(customer.lastName || '');
  const [address, setAddress] = useState(customer.address || '');
  const [phone, setPhone] = useState(customer.phone || '');
  const [startDate, setStartDate] = useState(() => {
    if (!customer.startDate) return '';
    try {
      return new Date(customer.startDate).toISOString().split('T')[0];
    } catch {
      return '';
    }
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const updated: Customer = {
        ...customer,
        firstName,
        lastName,
        address,
        phone,
        startDate,
      };

      if (customer.id === undefined) {
        throw new Error('Customer ID is missing.');
      }

      await CustomersService.putApiCustomers(customer.id, updated);
      onUpdate(updated);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to update customer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      title="Edit Customer"
      onConfirm={handleSubmit}
      onCancel={onClose}
      submitting={submitting}
    >
      <TextBox value={firstName} label="First Name" onChange={setFirstName} />
      <TextBox value={lastName} label="Last Name" onChange={setLastName} />
      <TextBox value={address} label="Address" onChange={setAddress} />
      <TextBox value={phone} label="Phone" onChange={setPhone} />
      <DateBox value={startDate} label="Start Date" onChange={setStartDate} />

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Dialog>
  );
};

export default CustomerEditDialog;

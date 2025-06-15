import React, { useState } from 'react';
import { SalesPersonsService } from '../../types/openapi/services/SalesPersonsService';
import type { SalesPerson } from '../../types/openapi/models/SalesPerson';
import { TextBox } from '../../components/textbox/Textbox';
import { DateBox } from '../../components/date/Datebox';
import Dialog from '../../components/dialog/Dialog';

interface Props {
  onAdd: (newPerson: SalesPerson) => void;
  onClose: () => void;
  salesPersons: SalesPerson[];
}

export const SalesPersonAddDialog: React.FC<Props> = ({ onAdd, onClose, salesPersons }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [manager, setManager] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    const duplicate = salesPersons.some(p =>
      p.firstName.trim().toLowerCase() === firstName.trim().toLowerCase() &&
      p.lastName.trim().toLowerCase() === lastName.trim().toLowerCase()
    );
    if (duplicate) {
      setError('A salesperson with this name already exists.');
      setSubmitting(false);
      return;
    }
    try {
      const newSalesPerson: SalesPerson = {
        id: 0,
        firstName,
        lastName,
        address,
        phone,
        startDate,  // ISO 8601 format string (e.g. "2025-06-14")
        manager,
      };

      const created = await SalesPersonsService.postApiSalesPersons(newSalesPerson);
      onAdd(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to add salesperson. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <Dialog
          title="New SalesPerson"
          onConfirm={handleSubmit}
          onCancel={onClose}
          submitting={submitting}
        >

      <TextBox
        value={firstName}
        label="First Name"
        onChange={setFirstName} />

      <TextBox
        value={lastName}
        label="Last Name"
        onChange={setLastName} />

      <TextBox
        value={address}
        label="Address"
        onChange={setAddress} />

      <TextBox
        value={phone}
        label="Phone"
        onChange={setPhone} />

      <DateBox
        value={startDate}
        label="Start Date"
        onChange={setStartDate} />

      <TextBox
        value={manager}
        label="Manager"
        onChange={setManager} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      </Dialog>
  );
};


import React, { useState } from 'react';
import { SalesPersonsService } from '../../types/openapi/services/SalesPersonsService';
import type { SalesPerson } from '../../types/openapi/models/SalesPerson';
import { DateBox } from '../../components/date/Datebox';
import { TextBox } from '../../components/textbox/Textbox';
import { Dialog } from '../../components/dialog/Dialog';

interface Props {
  salesPerson: SalesPerson;
  onUpdate: (updatedPerson: SalesPerson) => void;
  onClose: () => void;
}

const SalesPersonEditDialog: React.FC<Props> = ({ salesPerson, onUpdate, onClose }) => {
  const [firstName, setFirstName] = useState(salesPerson.firstName);
  const [lastName, setLastName] = useState(salesPerson.lastName);
  const [address, setAddress] = useState(salesPerson.address);
  const [phone, setPhone] = useState(salesPerson.phone || '');
  const [startDate, setStartDate] = useState(() => {
    if (!salesPerson.startDate) return '';
    try {
      return new Date(salesPerson.startDate).toISOString().split('T')[0];
    } catch {
      return '';
    }
  });
   const [terminationDate, setTerminationDate] = useState(() => {
    if (!salesPerson.terminationDate) return '';
    try {
      return new Date(salesPerson.terminationDate).toISOString().split('T')[0];
    } catch {
      return '';
    }
  });
  const [manager, setManager] = useState(salesPerson.manager || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const updated: SalesPerson = {
        ...salesPerson,
        firstName,
        lastName,
        address,
        phone,
        startDate,
        terminationDate,
        manager,
      };

      if (salesPerson.id === undefined) {
        throw new Error('SalesPerson ID is missing.');
      }
      await SalesPersonsService.putApiSalesPersons(salesPerson.id, updated);
      onUpdate(updated);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to update salesperson. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
     <Dialog
      title="Edit SalesPerson"
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

      <DateBox
        value={terminationDate}
        label="Termination Date"
        onChange={setTerminationDate} />  

      <TextBox
        value={manager}
        label="Manager"
        onChange={setManager} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      </Dialog>
  );
};

export default SalesPersonEditDialog;

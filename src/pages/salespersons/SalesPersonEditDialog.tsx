import React, { useState } from 'react';
import { SalesPersonsService } from '../../types/openapi/services/SalesPersonsService';
import type { SalesPerson } from '../../types/openapi/models/SalesPerson';
import { formRowStyle, inputStyle, labelStyle } from '../../styles';

interface Props {
  salesPerson: SalesPerson;
  onUpdate: (updatedPerson: SalesPerson) => void;
  onClose: () => void;
}

const dialogStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  padding: '2rem',
  border: '1px solid #ccc',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  width: '330px',
  zIndex: 1000,
};

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
    <div style={dialogStyle}>
      <h3>Edit SalesPerson</h3>

      <div style={formRowStyle}>
        <label style={labelStyle}>First Name:</label>
        <input style={inputStyle} value={firstName} onChange={e => setFirstName(e.target.value)} />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Last Name:</label>
        <input style={inputStyle} value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Address:</label>
        <input style={inputStyle} value={address} onChange={e => setAddress(e.target.value)} />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Phone:</label>
        <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Start Date:</label>
        <input style={inputStyle} type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Manager:</label>
        <input style={inputStyle} value={manager} onChange={e => setManager(e.target.value)} />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSubmit} disabled={submitting} style={{ marginRight: '10px' }}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SalesPersonEditDialog;

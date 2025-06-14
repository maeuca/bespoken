import React, { useState } from 'react';
import type { Sale } from '../../types/openapi/models/Sale';
import type { Product } from '../../types/openapi/models/Product';
import type { Customer } from '../../types/openapi/models/Customer';
import type { SalesPerson } from '../../types/openapi/models/SalesPerson';
import { SalesService } from '../../types/openapi/services/SalesService';
import { formRowStyle, inputStyle, labelStyle } from '../../styles';

interface Props {
  products: Product[];
  customers: Customer[];
  salesPeople: SalesPerson[];
  onAdd: (sale: Sale) => void;
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
  width: '360px',
  zIndex: 1000,
};

const SalesAddDialog: React.FC<Props> = ({ products, customers, salesPeople, onAdd, onClose }) => {
  const [productId, setProductId] = useState<number>(products[0]?.id ?? 0);
  const [customerId, setCustomerId] = useState<number>(customers[0]?.id ?? 0);
  const [salesPersonId, setSalesPersonId] = useState<number>(salesPeople[0]?.id ?? 0);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const newSale: Sale = {
        productId,
        customerId,
        salesPersonId,
        date,
      };
      const created = await SalesService.postApiSales(newSale);
      onAdd(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to add sale.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={dialogStyle}>
      <h3>Add New Sale</h3>

      <div style={formRowStyle}>
        <label style={labelStyle}>Product:</label>
        <select style={inputStyle} value={productId} onChange={(e) => setProductId(Number(e.target.value))}>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Customer:</label>
        <select style={inputStyle}  value={customerId} onChange={(e) => setCustomerId(Number(e.target.value))}>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.firstName} {c.lastName}
            </option>
          ))}
        </select>
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Salesperson:</label>
        <select style={inputStyle} value={salesPersonId} onChange={(e) => setSalesPersonId(Number(e.target.value))}>
          {salesPeople.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Date:</label>
        <input style={inputStyle} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSubmit} disabled={submitting} style={{ marginRight: '10px' }}>
          {submitting ? 'Adding...' : 'Add'}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SalesAddDialog;

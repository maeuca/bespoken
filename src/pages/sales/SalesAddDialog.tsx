import React, { useState } from 'react';
import type { Sale } from '../../types/openapi/models/Sale';
import type { Product } from '../../types/openapi/models/Product';
import type { Customer } from '../../types/openapi/models/Customer';
import type { SalesPerson } from '../../types/openapi/models/SalesPerson';
import { SalesService } from '../../types/openapi/services/SalesService';
import { SelectList } from '../../components/select/SelectList';
import { DateBox } from '../../components/date/Datebox';
import Dialog from '../../components/dialog/Dialog';

interface Props {
  products: Product[];
  customers: Customer[];
  salesPeople: SalesPerson[];
  onAdd: (sale: Sale) => void;
  onClose: () => void;
}

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
    <Dialog
      title="Add New Sale"
      onConfirm={handleSubmit}
      onCancel={onClose}
      confirmLabel="Add"
      submitting={submitting}
    >

      <SelectList
        items={products.map(p => ({ id: p.id, name: p.name }))}
        label={'Product'}
        selectedItem={productId.toString()}
        onSelect={(item) => {
          if (item !== undefined) {
            setProductId(Number(item));
          }
        }}
      />

      <SelectList
        items={customers.map(p => ({ id: p.id, name: `${p.firstName} ${p.lastName}` }))}
        label={'Customer'}
        selectedItem={customerId}
        onSelect={(item) => {
          if (item !== undefined) {
            setCustomerId(Number(item));
          }
        }}
      />

      <SelectList
        items={salesPeople.map(s => ({ id: s.id, name: `${s.firstName} ${s.lastName}` }))}
        label={'Salesperson'}
        selectedItem={salesPersonId}
        onSelect={(item) => {
          if (item !== undefined) {
            setSalesPersonId(Number(item));
          }
        }
        } />

      <DateBox
        value={date}
        label="Date"
        onChange={setDate}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      </Dialog>
  );
};

export default SalesAddDialog;

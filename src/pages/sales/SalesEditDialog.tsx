import React, { useState } from 'react';
import type { Sale } from '../../types/openapi/models/Sale';
import type { Product } from '../../types/openapi/models/Product';
import type { Customer } from '../../types/openapi/models/Customer';
import type { SalesPerson } from '../../types/openapi/models/SalesPerson';
import { SalesService } from '../../types/openapi/services/SalesService';
import { DateBox } from '../../components/date/Datebox';
import { SelectList } from '../../components/select/SelectList';
import { Dialog } from '../../components/dialog/Dialog';

interface Props {
  sale: Sale;
  products: Product[];
  customers: Customer[];
  salesPeople: SalesPerson[];
  onUpdate: (updatedSale: Sale) => void;
  onClose: () => void;
}

const SalesEditDialog: React.FC<Props> = ({ sale, products, customers, salesPeople, onUpdate, onClose }) => {
  const [productId, setProductId] = useState<number>(sale.productId);
  const [customerId, setCustomerId] = useState<number>(sale.customerId);
  const [salesPersonId, setSalesPersonId] = useState<number>(sale.salesPersonId);
  const [date, setDate] = useState<string>(() => {
    try {
      return new Date(sale.date).toISOString().split('T')[0];
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
      const updatedSale: Sale = {
        ...sale,
        productId,
        customerId,
        salesPersonId,
        date,
      };

      if (!sale.id) throw new Error('Sale ID is missing');

      await SalesService.putApiSales(sale.id, updatedSale);
      onUpdate(updatedSale);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to update sale.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      title="Edit Sale"
      onConfirm={handleSubmit}
      onCancel={onClose}
      confirmLabel="Save"
      submitting={submitting}
    >
      <SelectList
        items={products.map(p => ({ id: p.id, name: p.name }))}
        label="Product"
        selectedItem={productId}
        onSelect={(item) => {
          if (item !== undefined) {
            setProductId(Number(item));
          }
        }}
      />

      <SelectList
        items={customers.map(c => ({ id: c.id, name: `${c.firstName} ${c.lastName}` }))}
        label="Customer"
        selectedItem={customerId}
        onSelect={(item) => {
          if (item !== undefined) {
            setCustomerId(Number(item));
          }
        }}
      />

      <SelectList
        items={salesPeople.map(s => ({ id: s.id, name: `${s.firstName} ${s.lastName}` }))}
        label="Salesperson"
        selectedItem={salesPersonId}
        onSelect={(item) => {
          if (item !== undefined) {
            setSalesPersonId(Number(item));
          }
        }}
      />

      <DateBox
        value={date}
        label="Date"
        onChange={setDate}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Dialog>
  );
};

export default SalesEditDialog;

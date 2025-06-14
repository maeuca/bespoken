import React, { useState } from 'react';
import type { Product } from '../../types/openapi/models/Product';
import { ProductsService } from '../../types/openapi/services/ProductsService';
import { TextBox } from '../../components/textbox/Textbox';
import { NumberBox } from '../../components/numberbox/NumberBox';

interface Props {
  product: Product;
  onUpdate: (updated: Product) => void;
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
  zIndex: 1000,
  width: '350px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '4px',
  marginBottom: '10px',
};

const ProductEditDialog: React.FC<Props> = ({ product, onUpdate, onClose }) => {
  const [form, setForm] = useState<Product>({ ...product });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof Product, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      if (form.id === undefined) throw new Error('Product ID is missing');
      await ProductsService.putApiProducts(form.id, form); // Adjust service method name if needed
      onUpdate(form);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={dialogStyle}>
      <h3>Edit Product</h3>

      <TextBox
        label="Name"
        value={form.name}
        onChange={(value) => handleChange('name', value)}
      />

      <TextBox
        label="Manufacturer"
        value={form.manufacturer}
        onChange={(value) => handleChange('manufacturer', value)}
      />

      <TextBox
        label="Style"
        value={form.style}
        onChange={(value) => handleChange('style', value)}
      />

      <NumberBox
        label="Purchase Price"
        value={form.purchasePrice}
        onChange={(value) => handleChange('purchasePrice', value)}
      />

      <NumberBox
        label="Sales Price"
        value={form.salePrice}
        onChange={(value) => handleChange('salePrice', value)}
      />

      <NumberBox
        label="Quantity on Hand"
        value={form.qtyOnHand}
        onChange={(value) => handleChange('qtyOnHand', value)}
      />

      <NumberBox
        label="Commission Percentage"
        value={form.commissionPercentage}
        onChange={(value) => handleChange('commissionPercentage', value)}
      />

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

export default ProductEditDialog;

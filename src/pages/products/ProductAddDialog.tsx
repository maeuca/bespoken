import React, { useState } from 'react';
import { ProductsService } from '../../types/openapi/services/ProductsService';
import type { Product } from '../../types/openapi/models/Product';
import { formRowStyle, labelStyle } from '../../styles';

interface Props {
    onAdd: (newProduct: Product) => void;
    onClose: () => void;
    products: Product[]; // Optional, used for duplicate check
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
    width: '40%',
    zIndex: 1000,
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '6px',
    marginBottom: '10px',
};

const ProductAddDialog: React.FC<Props> = ({ onAdd, onClose, products }) => {
    const [name, setName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [style, setStyle] = useState('');
    const [purchasePrice, setPurchasePrice] = useState<number>(0);
    const [salePrice, setSalePrice] = useState<number>(0);
    const [qtyOnHand, setQtyOnHand] = useState<number>(0);
    const [commissionPercentage, setCommissionPercentage] = useState<number>(0);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(null);
        const duplicate = products.some(p =>
            p.name.trim().toLowerCase() === name.trim().toLowerCase()
        );
        if (duplicate) {
            setError('A product with this name already exists.');
            setSubmitting(false);
            return;
        }

        try {
            const newProduct: Product = {
                id: 0, // assumed to be auto-generated
                name,
                manufacturer,
                style,
                purchasePrice,
                salePrice,
                qtyOnHand,
                commissionPercentage,
            };

            const created = await ProductsService.postApiProducts(newProduct);
            onAdd(created);
            onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to add product. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

   return (
    <div style={dialogStyle}>
      <h3>Add New Product</h3>

      <div style={formRowStyle}>
        <label style={labelStyle}>Name:</label>
        <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Manufacturer:</label>
        <input style={inputStyle} value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Style:</label>
        <input style={inputStyle} value={style} onChange={e => setStyle(e.target.value)} />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Purchase Price:</label>
        <input
          style={inputStyle}
          type="number"
          value={purchasePrice}
          onChange={e => setPurchasePrice(parseFloat(e.target.value))}
        />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Sale Price:</label>
        <input
          style={inputStyle}
          type="number"
          value={salePrice}
          onChange={e => setSalePrice(parseFloat(e.target.value))}
        />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Quantity on Hand:</label>
        <input
          style={inputStyle}
          type="number"
          value={qtyOnHand}
          onChange={e => setQtyOnHand(parseInt(e.target.value))}
        />
      </div>

      <div style={formRowStyle}>
        <label style={labelStyle}>Commission Percentage:</label>
        <input
          style={inputStyle}
          type="number"
          value={commissionPercentage}
          onChange={e => setCommissionPercentage(parseFloat(e.target.value))}
        />
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

export default ProductAddDialog;

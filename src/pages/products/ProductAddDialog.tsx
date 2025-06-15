import React, { useState } from 'react';
import { ProductsService } from '../../types/openapi/services/ProductsService';
import type { Product } from '../../types/openapi/models/Product';
import { formRowStyle, labelStyle } from '../../styles';
import { TextBox } from '../../components/textbox/Textbox';
import { NumberBox } from '../../components/numberbox/NumberBox';
import Dialog from '../../components/dialog/Dialog';

interface Props {
  onAdd: (newProduct: Product) => void;
  onClose: () => void;
  products: Product[]; // Optional, used for duplicate check
}

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
     <Dialog
          title="Add New Product"
          onConfirm={handleSubmit}
          onCancel={onClose}
          confirmLabel="Add"
          submitting={submitting}
        >
          
      <TextBox
        value={name}
        label="First Name"
        onChange={setName} />


      <TextBox
        value={manufacturer}
        label="Manufacturer"
        onChange={setManufacturer} />

      <TextBox
        value={style}
        label="Style"
        onChange={setStyle} />

      <NumberBox
        label="Purchase Price"
        value={purchasePrice}
        onChange={setPurchasePrice}
      />

      <NumberBox
        label="Sale Price"
        value={salePrice}
        onChange={setSalePrice}
      />

      <NumberBox
        label="Quantity"
        value={qtyOnHand}
        onChange={setQtyOnHand}
      />

      <NumberBox
        label="Commission"
        value={commissionPercentage}
        onChange={setCommissionPercentage}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      </Dialog>
  );

};

export default ProductAddDialog;

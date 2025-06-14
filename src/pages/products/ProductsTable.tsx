import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '../../components/table/PaginatedTable';
import type { Product } from '../../types/openapi/models/Product';
import { ProductsService } from '../../types/openapi/services/ProductsService'; // Adjust path if needed
import type { Column } from '../../components/table/PaginatedTable';
import ProductEditDialog from './ProductEditDialog';
import ProductAddDialog from './ProductAddDialog';

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductsService.getApiProducts() // Replace with correct service function name
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns: Column<Product>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Manufacturer', accessor: 'manufacturer' },
    { header: 'Style', accessor: 'style' },
    { header: 'Purchase Price', accessor: 'purchasePrice' },
    { header: 'Sale Price', accessor: 'salePrice' },
    { header: 'Qty On Hand', accessor: 'qtyOnHand' },
    { header: 'Commission %', accessor: 'commissionPercentage' },
  ];

  const renderEditDialog = (row: Product, close: () => void) => (
    <ProductEditDialog
      product={row}
      onUpdate={(updated) => {
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      }}
      onClose={close}
    />
  );
  const renderAddDialog = (close: () => void) => (
    <ProductAddDialog
      products={products} // Pass existing products for duplicate check
      onAdd={(newProduct) => {
        setProducts(prev => [...prev, newProduct]);
      }}
      onClose={close}
    />
  );

  const renderDeleteDialog = (product: Product, close: () => void) => (
    <div
      style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        padding: '2rem',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
        width: '320px',
      }}
    >
      <h3>Confirm Delete</h3>
      <p>
        Are you sure you want to delete <strong>{product.name}</strong>?
      </p>
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => {
            if (product.id !== undefined) {
              ProductsService.deleteApiProducts(product.id)
                .then(() => {
                  setProducts(prev => prev.filter(p => p.id !== product.id));
                  console.log(`Deleted product with ID: ${product.id}`);
                })
                .catch(console.error);
            } else {
              console.error('Product ID is missing, cannot delete.');
            }
            close();
          }}
          style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
        >
          Delete
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );

  if (loading) return <p>Loading...</p>;

  return (
    <PaginatedTable
      title="Products"
      data={products}
      columns={columns}
      itemsPerPage={10}
      renderEditDialog={renderEditDialog}
      renderAddDialog={renderAddDialog}
      renderDeleteDialog={renderDeleteDialog}
    />
  );
};

export default ProductsTable;

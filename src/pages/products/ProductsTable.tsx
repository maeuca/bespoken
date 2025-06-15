import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '../../components/table/PaginatedTable';
import type { Product } from '../../types/openapi/models/Product';
import { ProductsService } from '../../types/openapi/services/ProductsService'; // Adjust path if needed
import type { Column } from '../../components/table/PaginatedTable';
import ProductEditDialog from './ProductEditDialog';
import ProductAddDialog from './ProductAddDialog';
import Confirmation from '../../components/alerts/Confirmation';

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
    <Confirmation
      title="Confirm Delete"
      message={`Are you sure you want to delete ${product.name}?`}
      onConfirm={async () => {
        try {
          if (product.id === undefined) throw new Error('Product ID is missing');
          await ProductsService.deleteApiProducts(product.id);
          setProducts(prev => prev.filter(p => p.id !== product.id));
        } catch (err) {
          console.error('Delete failed', err);
        } finally {
          close();
        }
      }}
      onCancel={close}
      confirmLabel="Delete"
    />
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

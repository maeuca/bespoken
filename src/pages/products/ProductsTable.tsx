import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '../../components/table/PaginatedTable';
import type { Product } from '../../types/openapi/models/Product';
import { ProductsService } from '../../types/openapi/services/ProductsService'; // Adjust path if needed
import type { Column } from '../../components/table/PaginatedTable';
import ProductEditDialog from './ProductEditDialog';

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

  if (loading) return <p>Loading...</p>;

  return (
    <PaginatedTable
      data={products}
      columns={columns}
      itemsPerPage={10}
      renderEditDialog={renderEditDialog}
    />
  );
};

export default ProductsTable;

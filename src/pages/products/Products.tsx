import React, { Suspense, lazy } from 'react';
const ProductsTable = lazy(() => import('./ProductsTable'));

export const Products: React.FC = () => {
    return (
        <div>
        <Suspense fallback={<p>Loading products table...</p>}>
        <ProductsTable />
        </Suspense>
        </div>
    );
}   
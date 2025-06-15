import React, { Suspense, lazy } from 'react';
import { Loader } from '../../components/loader/Loader';
const ProductsTable = lazy(() => import('./ProductsTable'));

export const Products: React.FC = () => {
    return (
        <div>
        <Suspense fallback={<Loader/>}>
        <ProductsTable />
        </Suspense>
        </div>
    );
}   
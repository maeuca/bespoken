import React, { Suspense, lazy } from 'react';
import { Loader } from '../../components/loader/Loader';
const CustomersTable = lazy(() => import('./CustomersTable'));

export const Customers: React.FC = () => {
    return (
        <div>
        <Suspense fallback={<Loader/>}>
        <CustomersTable />
        </Suspense>
        </div>
    );
}
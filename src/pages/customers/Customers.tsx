import React, { Suspense, lazy } from 'react';
const CustomersTable = lazy(() => import('./CustomersTable'));

export const Customers: React.FC = () => {
    return (
        <div>
        <Suspense fallback={<p>Loading customers table...</p>}>
        <CustomersTable />
        </Suspense>
        </div>
    );
}
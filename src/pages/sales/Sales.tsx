import React, { Suspense, lazy } from 'react';
const SalesTable = lazy(() => import('./SalesTable'));

export const Sales : React.FC = () => {
    return (
        <div>
        <Suspense fallback={<p>Loading sales table...</p>}>
        <SalesTable />
        </Suspense>
        </div>
    );
}
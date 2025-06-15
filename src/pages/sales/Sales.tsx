import React, { Suspense, lazy } from 'react';
import { Loader } from '../../components/loader/Loader';
const SalesTable = lazy(() => import('./SalesTable'));

export const Sales : React.FC = () => {
    return (
        <div>
        <Suspense fallback={<Loader/>}>
        <SalesTable />
        </Suspense>
        </div>
    );
}
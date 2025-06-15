import React, { Suspense, lazy } from 'react';
import { Loader } from '../../components/loader/Loader';
const CommissionReportTable = lazy(() => import('./CommissionsReportTable'));

export const Commissions: React.FC = () => {
    return (
        <div>
        <Suspense fallback={<Loader/>}>
        <CommissionReportTable />
        </Suspense>
        </div>
    );
}
import React, { Suspense, lazy } from 'react';
const CommissionReportTable = lazy(() => import('./CommissionsReportTable'));

export const Commissions: React.FC = () => {
    return (
        <div>
        <Suspense fallback={<p>Loading comissions table...</p>}>
        <CommissionReportTable />
        </Suspense>
        </div>
    );
}
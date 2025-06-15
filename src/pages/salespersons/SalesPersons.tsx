import React, { Suspense, lazy } from 'react';

const SalesPersonsTable = lazy(() => import('./SalesPersonsTable'));

export const SalesPersons: React.FC = () => {
  return (
    <div>
    <Suspense fallback={<p>Loading salespersons table...</p>}>
    <SalesPersonsTable />
    </Suspense>
    </div>
  );
};

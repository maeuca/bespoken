import React, { Suspense, lazy } from 'react';
import { Loader } from '../../components/loader/Loader';

const SalesPersonsTable = lazy(() => import('./SalesPersonsTable'));

export const SalesPersons: React.FC = () => {
  return (
    <div>
    <Suspense fallback={<Loader/>}>
    <SalesPersonsTable />
    </Suspense>
    </div>
  );
};

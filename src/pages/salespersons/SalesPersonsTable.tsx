import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { SalesPersonsService } from '../../types/openapi/services/SalesPersonsService';
import type { SalesPerson } from '../../types/openapi/models/SalesPerson';
import type { Column } from '../../components/table/PaginatedTable';
import { PaginatedTable } from '../../components/table/PaginatedTable';
import SalesPersonEditDialog from './SalesPersonEditDialog';
import { SalesPersonAddDialog } from './SalesPersonAddDialog';
import Confirmation from '../../components/alerts/Confirmation';
import { Loader } from '../../components/loader/Loader';

const SalesPersonsTable: React.FC = () => {
  const [salesPeople, setSalesPeople] = useState<SalesPerson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SalesPersonsService.getApiSalesPersons()
      .then(setSalesPeople)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns: Column<SalesPerson>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Address', accessor: 'address' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Start Date', accessor: 'startDate', render: (value) => {
      try {
        return format(new Date(value as string), 'MMM dd, yyyy');
      } catch {
        return value;
      }
    }, },
     { header: 'Termination Date', accessor: 'terminationDate', render: (value) => {
      try {
        return format(new Date(value as string), 'MMM dd, yyyy');
      } catch {
        return value;
      }
    }, },
    { header: 'Manager', accessor: 'manager' },
  ];

  const renderEditDialog = (row: SalesPerson, close: () => void) => (
    <SalesPersonEditDialog
      salesPerson={row}
      onUpdate={(updated) => {
        setSalesPeople(prev =>
          prev.map(p => (p.id === updated.id ? updated : p))
        );
      }}
      onClose={close}
    />
  );

  const renderAddDialog = (close: () => void) => (
    <SalesPersonAddDialog
      salesPersons={salesPeople}
      onAdd={(newPerson) => {
        setSalesPeople(prev => [...prev, newPerson]);
      }}
      onClose={close}
    />
  );

  const renderDeleteDialog = (row: SalesPerson, close: () => void) => (
  <Confirmation
    title="Confirm Delete"
    message={`Are you sure you want to delete ${row.firstName} ${row.lastName}?`}
    onConfirm={() => {
      if (row.id !== undefined) {
        SalesPersonsService.deleteApiSalesPersons(row.id).then(() => {
          setSalesPeople(prev => prev.filter(p => p.id !== row.id));
        }).catch(console.error);
      }
      close();
    }}
    onCancel={close}
    confirmLabel="Delete"
  />
);
  if (loading) return <Loader/>;

  return (
    <PaginatedTable
      title="Sales Agents"
      data={salesPeople}
      columns={columns}
      itemsPerPage={10}
      renderEditDialog={renderEditDialog}
      renderAddDialog={renderAddDialog}
      renderDeleteDialog={renderDeleteDialog}
    />
  );
};

export default SalesPersonsTable;

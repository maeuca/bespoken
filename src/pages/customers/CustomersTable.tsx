import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { PaginatedTable } from '../../components/table/PaginatedTable';
import type { Customer } from '../../types/openapi/models/Customer';
import { CustomersService } from '../../types/openapi/services/CustomersService';
import type { Column } from '../../components/table/PaginatedTable';
import { Loader } from '../../components/loader/Loader';
import CustomerEditDialog from './CustomerEditDialog';
import { CustomerAddDialog } from './CustomerAddDialog';
import Confirmation from '../../components/alerts/Confirmation';

const CustomersTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CustomersService.getApiCustomers()
      .then(setCustomers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns: Column<Customer>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Address', accessor: 'address' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Start Date',
      accessor: 'startDate',
      render: (value) => {
        try {
          return value ? format(new Date(value as string), 'MMM dd, yyyy') : '';
        } catch {
          return value;
        }
      },
    },
  ];

  const renderEditDialog = (row: Customer, close: () => void) => (
    <CustomerEditDialog
      customer={row}
      onUpdate={(updated) => {
        setCustomers(prev => prev.map(p => (p.id === updated.id ? updated : p)));
      }}
      onClose={close}
    />
  );

  const renderAddDialog = (close: () => void) => (
    <CustomerAddDialog
      customers={customers}
      onAdd={(newCustomer) => {
        setCustomers(prev => [...prev, newCustomer]);
      }}
      onClose={close}
    />
  );

  const renderDeleteDialog = (row: Customer, close: () => void) => (
    <Confirmation
      title="Confirm Delete"
      message={`Are you sure you want to delete ${row.firstName} ${row.lastName}?`}
      onConfirm={async () => {
        try {
          if (row.id === undefined) throw new Error('Customer ID is missing');
          await CustomersService.deleteApiCustomers(row.id);
          setCustomers(prev => prev.filter(p => p.id !== row.id));
        } catch (err) {
          console.error('Delete failed', err);
        } finally {
          close();
        }
      }}
      onCancel={close}
      confirmLabel="Delete"
    />
  );

  if (loading) return <Loader />;

  return (
    <PaginatedTable
      title="Customers"
      data={customers}
      columns={columns}
      itemsPerPage={10}
      renderEditDialog={renderEditDialog}
      renderAddDialog={renderAddDialog}
      renderDeleteDialog={renderDeleteDialog}
    />
  );
};

export default CustomersTable;

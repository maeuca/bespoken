import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { PaginatedTable } from '../../components/table/PaginatedTable';
import type { Customer } from '../../types/openapi/models/Customer';
import { CustomersService } from '../../types/openapi/services/CustomersService'; // Adjust the path and service name if needed
import type { Column } from '../../components/table/PaginatedTable';

const CustomersTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CustomersService.getApiCustomers() // Replace with correct function if different
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

  if (loading) return <p>Loading...</p>;

  return (
    <PaginatedTable
      title="Customers"
      data={customers}
      columns={columns}
      itemsPerPage={10}
    />
  );
};

export default CustomersTable;

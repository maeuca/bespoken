import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '../../components/table/PaginatedTable';
import { SalesService } from '../../types/openapi/services/SalesService';
import type { Sale } from '../../types/openapi/models/Sale';
import type { Column } from '../../components/table/PaginatedTable';

type CommissionRow = {
  salesPersonName: string;
  quarter: string;
  totalCommission: number;
};

const getQuarter = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `Q${quarter} ${year}`;
};

const getCommission = (sale: Sale): number => {
  const price = sale.product?.salePrice ?? 0;
  const pct = sale.product?.commissionPercentage ?? 0;
  return (price * pct) / 100;
};

const CommissionReportTable: React.FC = () => {
  const [reportData, setReportData] = useState<CommissionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SalesService.getApiSales()
      .then((sales) => {
        const grouped: Record<string, CommissionRow> = {};

        sales.forEach((sale) => {
          const salesperson = sale.salesPerson;
          if (!salesperson || !sale.date) return;

          const key = `${salesperson.id}-${getQuarter(sale.date)}`;
          if (!grouped[key]) {
            grouped[key] = {
              salesPersonName: `${salesperson.firstName ?? ''} ${salesperson.lastName ?? ''}`.trim(),
              quarter: getQuarter(sale.date),
              totalCommission: 0,
            };
          }

          grouped[key].totalCommission += getCommission(sale);
        });

        setReportData(Object.values(grouped));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns: Column<CommissionRow>[] = [
    { header: 'Salesperson', accessor: 'salesPersonName' },
    { header: 'Quarter', accessor: 'quarter' },
    {
      header: 'Total Commission',
      accessor: 'totalCommission',
      render: (val) => `$${(val as number).toFixed(2)}`,
    },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <PaginatedTable
      data={reportData}
      columns={columns}
      itemsPerPage={10}
    />
  );
};

export default CommissionReportTable;

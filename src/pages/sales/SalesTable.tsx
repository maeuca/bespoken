import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import type { Sale } from '../../types/openapi/models/Sale';
import type { Column } from '../../components/table/PaginatedTable';
import { PaginatedTable } from '../../components/table/PaginatedTable';
import { SalesService } from '../../types/openapi/services/SalesService'; 
import { ProductsService } from '../../types/openapi/services/ProductsService';
import { CustomersService } from '../../types/openapi/services/CustomersService';
import { SalesPersonsService } from '../../types/openapi/services/SalesPersonsService';
import SalesAddDialog from './SalesAddDialog';
import type { Customer, Product, SalesPerson } from '../../types/openapi';

const SalesTable: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [salesPeople, setSalesPeople] = useState<SalesPerson[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            SalesService.getApiSales(),
            ProductsService.getApiProducts(),
            CustomersService.getApiCustomers(),
            SalesPersonsService.getApiSalesPersons(),
        ])
            .then(([salesData, productData, customerData, salesPersonData]) => {
                setSales(salesData);
                setProducts(productData);
                setCustomers(customerData);
                setSalesPeople(salesPersonData);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    const columns: Column<Sale>[] = [
        {
            header: 'Product',
            accessor: 'product',
            render: (_, row) => row.product?.name ?? '—',
        },
        {
            header: 'Customer',
            accessor: 'customer',
            render: (_, row) =>
                `${row.customer?.firstName ?? ''} ${row.customer?.lastName ?? ''}`.trim() || '—',
        },
        {
            header: 'Date',
            accessor: 'date',
            render: (value, _row) => {
                try {
                    return format(new Date(value as string), 'MMM dd, yyyy');
                } catch {
                    return value ? String(value) : '—';
                }
            },
            sortable: true,
        },
        {
            header: 'Price',
            accessor: 'product',
            render: (_, row) =>
                row.product?.salePrice != null ? `$${row.product.salePrice.toFixed(2)}` : '—',
        },
        {
            header: 'Salesperson',
            accessor: 'salesPerson',
            render: (_, row) =>
                `${row.salesPerson?.firstName ?? ''} ${row.salesPerson?.lastName ?? ''}`.trim() || '—',
        },
        {
            header: 'Commission',
            accessor: 'salesPerson',
            render: (_, row) => {
                const price = row.product?.salePrice ?? 0;
                const pct = row.product?.commissionPercentage ?? 0;
                const commission = (price * pct) / 100;
                return price && pct ? `$${commission.toFixed(2)}` : '—';
            },
        },
    ];

    const renderAddDialog = (close: () => void) => (
        <SalesAddDialog
            products={products}
            customers={customers}
            salesPeople={salesPeople}
            onAdd={() => {
                fetchData();
            }}
            onClose={close}
        />
    );

    if (loading) return <p>Loading...</p>;

    return (
        <PaginatedTable
            title="Sales Records"
            data={sales}
            columns={columns}
            itemsPerPage={10}
            renderAddDialog={renderAddDialog}
        />
    );
};

export default SalesTable;

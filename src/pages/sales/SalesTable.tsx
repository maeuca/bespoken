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
import SalesEditDialog from './SalesEditDialog';
import Confirmation from '../../components/alerts/Confirmation';

const SalesTable: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [salesPeople, setSalesPeople] = useState<SalesPerson[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
                setFilteredSales(salesData);
                setProducts(productData);
                setCustomers(customerData);
                setSalesPeople(salesPersonData);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

     const filterByDateRange = () => {
        if (!startDate && !endDate) {
            setFilteredSales(sales);
            return;
        }

        const filtered = sales.filter(sale => {
            const saleDate = new Date(sale.date || '').getTime();
            const start = startDate ? new Date(startDate).getTime() : -Infinity;
            const end = endDate ? new Date(endDate).getTime() : Infinity;
            return saleDate >= start && saleDate <= end;
        });

        setFilteredSales(filtered);
    };

    const clearFilterByDateRange = () => {
        setStartDate('');
        setEndDate('');
        setFilteredSales(sales);
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
            render: (value) => {
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

    const renderEditDialog = (row: Sale, close: () => void) => (
        <SalesEditDialog
            sale={row}
            products={products}
            customers={customers}
            salesPeople={salesPeople}
            onUpdate={() => {
                fetchData(); // refetch after edit
            }}
            onClose={close}
        />
    );

    
     const renderDeleteDialog = (row: Sale, close: () => void) => (
        <Confirmation
            title="Confirm Delete"
            message={`Are you sure you want to delete this sale for ${row.product?.name ?? 'Unknown Product'} to ${row.customer?.firstName ?? ''} ${row.customer?.lastName ?? ''}?`}
            onConfirm={async () => {
                try {
                    if (row.id === undefined) throw new Error('Missing sale ID');
                    await SalesService.deleteApiSales(row.id);
                    fetchData(); // Refresh data after deletion
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
     const renderFilterBar = () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div>
                <label>Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label>End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />
            </div>
            <div>
                <button onClick={filterByDateRange}>Filter</button>
            </div>
            <div>
                <button onClick={clearFilterByDateRange}>Clear</button>
            </div>
        </div>

    );

    if (loading) return <p>Loading...</p>;

    return (
        <PaginatedTable
            title="Sales Records"
            data={filteredSales}
            columns={columns}
            itemsPerPage={10}
            renderAddDialog={renderAddDialog}
            renderEditDialog={renderEditDialog}
            renderDeleteDialog={renderDeleteDialog}
            renderFilterBar={renderFilterBar}
        />
    );
};

export default SalesTable;

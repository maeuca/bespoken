import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PaginatedTable, Column } from './PaginatedTable'

type RowData = { id: number; name: string; age: number }

const data: RowData[] = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
]

const columns: Column<RowData>[] = [
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Age', accessor: 'age', sortable: true }
]

describe('PaginatedTable component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders title and table headers', () => {
        render(<PaginatedTable data={data} columns={columns} />)
        expect(screen.getByText('View Records')).toBeInTheDocument()
        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Age')).toBeInTheDocument()
    })

    it('renders rows correctly', () => {
        render(<PaginatedTable data={data} columns={columns} itemsPerPage={2} />)
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('Bob')).toBeInTheDocument()
        expect(screen.queryByText('Charlie')).not.toBeInTheDocument()
    })

    it('navigates to next page', () => {
        render(<PaginatedTable data={data} columns={columns} itemsPerPage={2} />)

        fireEvent.click(screen.getByRole('button', { name: /next/i }))
        expect(screen.getByText('Charlie')).toBeInTheDocument()
    })

    it('disables next button on last page', () => {
        render(<PaginatedTable data={data} columns={columns} itemsPerPage={2} />)

        fireEvent.click(screen.getByRole('button', { name: /next/i }))
        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
    })

    it('sorts columns when clicked', () => {
        render(<PaginatedTable data={data} columns={columns} itemsPerPage={3} />)

        const firstRow = () => screen.getAllByRole('row')[1]

        expect(firstRow()).toHaveTextContent('Alice')

        // Find the header by role and text
        const ageHeader = screen
            .getAllByRole('columnheader')
            .find((el) => el.textContent?.includes('Age'))

        if (!ageHeader) throw new Error('Age column header not found')

        // First sort click — ascending (25 should be first)
        fireEvent.click(ageHeader)
        expect(firstRow()).toHaveTextContent('Bob')

        // Second sort click — descending (35 should be first)
        fireEvent.click(ageHeader)
        expect(firstRow()).toHaveTextContent('Charlie')
    })



    it('opens Add dialog when "New Record" is clicked', () => {
        const addMock = vi.fn().mockReturnValue(<div>Add Dialog</div>)

        render(
            <PaginatedTable
                data={data}
                columns={columns}
                renderAddDialog={addMock}
            />
        )

        fireEvent.click(screen.getByText(/new record/i))
        expect(screen.getByText('Add Dialog')).toBeInTheDocument()
        expect(addMock).toHaveBeenCalled()
    })

    it('opens Edit dialog when edit icon is clicked', () => {
        const editMock = vi.fn().mockReturnValue(<div>Edit Dialog</div>)

        render(
            <PaginatedTable
                data={data}
                columns={columns}
                renderEditDialog={editMock}
            />
        )

        fireEvent.click(screen.getAllByLabelText('Edit')[0])
        expect(screen.getByText('Edit Dialog')).toBeInTheDocument()
        expect(editMock).toHaveBeenCalledWith(data[0], expect.any(Function))
    })

    it('opens Delete dialog when delete icon is clicked', () => {
        const deleteMock = vi.fn().mockReturnValue(<div>Delete Dialog</div>)

        render(
            <PaginatedTable
                data={data}
                columns={columns}
                renderDeleteDialog={deleteMock}
            />
        )

        fireEvent.click(screen.getAllByLabelText('Delete')[0])
        expect(screen.getByText('Delete Dialog')).toBeInTheDocument()
        expect(deleteMock).toHaveBeenCalledWith(data[0], expect.any(Function))
    })

    it('renders custom title and filter bar if provided', () => {
        render(
            <PaginatedTable
                data={data}
                columns={columns}
                title="Users"
                renderFilterBar={() => <div>Filters here</div>}
            />
        )

        expect(screen.getByText('Users')).toBeInTheDocument()
        expect(screen.getByText('Filters here')).toBeInTheDocument()
    })
})

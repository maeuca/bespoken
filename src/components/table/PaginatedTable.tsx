import React, { useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type PaginatedTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  renderEditDialog?: (row: T, close: () => void) => React.ReactNode;
  renderAddDialog?: (close: () => void) => React.ReactNode;
  renderDeleteDialog?: (row: T, close: () => void) => React.ReactNode;
};

export function PaginatedTable<T>({
  data,
  columns,
  itemsPerPage = 10,
  renderEditDialog,
  renderAddDialog,
  renderDeleteDialog,
}: PaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState<T | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deletingRow, setDeletingRow] = useState<T | null>(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(start, start + itemsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

  const handleCloseEdit = () => setEditingRow(null);
  const handleCloseAdd = () => setShowAddDialog(false);
  const handleCloseDelete = () => setDeletingRow(null);

  return (
    <div>
      {/* New Record Button */}
      {renderAddDialog && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <button
            onClick={() => setShowAddDialog(true)}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              padding: '6px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaPlus size={14} />
            New Record
          </button>
        </div>
      )}

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns
              .filter((col) => col.accessor !== 'id')
              .map((col) => (
                <th key={col.accessor as string} style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                  {col.header}
                </th>
              ))}
            {(renderEditDialog || renderDeleteDialog) && (
              <th style={{ borderBottom: '1px solid #ccc' }}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={(row as any).id ?? `row-${index}`}>
              {columns
                .filter((col) => col.accessor !== 'id')
                .map((col) => (
                  <td key={col.accessor as string} style={{ textAlign: 'left', fontSize: '.85em' }}>
                    {col.render ? col.render(row[col.accessor], row) : String(row[col.accessor])}
                  </td>
                ))}
              {(renderEditDialog || renderDeleteDialog) && (
                <td style={{ display: 'flex', gap: '10px' }}>
                  {renderEditDialog && (
                    <button
                      onClick={() => setEditingRow(row)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      aria-label="Edit"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                  )}
                  {renderDeleteDialog && (
                    <button
                      onClick={() => setDeletingRow(row)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      aria-label="Delete"
                      title="Delete"
                    >
                      <FaTrash size={16} color="red" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>

      {/* Pagination */}
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>

      {/* Dialogs */}
      {editingRow && renderEditDialog && renderEditDialog(editingRow, handleCloseEdit)}
      {showAddDialog && renderAddDialog && renderAddDialog(handleCloseAdd)}
      {deletingRow && renderDeleteDialog && renderDeleteDialog(deletingRow, handleCloseDelete)}
    </div>
  );
}

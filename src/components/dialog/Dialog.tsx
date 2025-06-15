// components/dialog/Dialog.tsx
import React from 'react';

interface DialogProps {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  submitting?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  onCancel,
  onConfirm,
  confirmLabel = 'Save',
  cancelLabel = 'Cancel',
  submitting = false,
}) => {
  const dialogStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    padding: '2rem',
    border: '1px solid #ccc',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    width: '330px',
    zIndex: 1000,
  };

  return (
    <div style={dialogStyle}>
      <h3>{title}</h3>
      {children}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={onConfirm} disabled={submitting} style={{ marginRight: '10px' }}>
          {submitting ? 'Saving...' : confirmLabel}
        </button>
        <button onClick={onCancel}>{cancelLabel}</button>
      </div>
    </div>
  );
};
export default Dialog;
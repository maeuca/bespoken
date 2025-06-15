import React from 'react';

interface ConfirmationProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const confirmationStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  padding: '2rem',
  border: '1px solid #ccc',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  zIndex: 1000,
  width: '360px',
};

const buttonGroupStyle: React.CSSProperties = {
  marginTop: '1rem',
  display: 'flex',
  gap: '10px',
};

const Confirmation: React.FC<ConfirmationProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) => {
  return (
    <div style={confirmationStyle}>
      <h3>{title}</h3>
      <p>{message}</p>
      <div style={buttonGroupStyle}>
        <button
          onClick={onConfirm}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          {confirmLabel}
        </button>
        <button onClick={onCancel}>{cancelLabel}</button>
      </div>
    </div>
  );
};

export default Confirmation;

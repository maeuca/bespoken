import React from 'react'
import { formRowStyle, labelStyle, inputStyle } from '../../styles'

interface NumberBoxProps {
  value?: number
  label?: string
  onChange: (value: number) => void
}

export const NumberBox: React.FC<NumberBoxProps> = ({ value, label, onChange }) => {
  const inputId = React.useId()

  return (
    <div style={formRowStyle}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="number"
        style={inputStyle}
        value={isNaN(value ?? NaN) ? '' : value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  )
}

import React from "react";
import { formRowStyle, labelStyle, inputStyle } from "../../styles";

interface DateBoxProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
}
export const DateBox: React.FC<DateBoxProps> = ({ value, label, onChange }) => {
  const inputId = React.useId(); // unique ID for label-input linking

   return (
    <div style={formRowStyle}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="date"
        style={inputStyle}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
